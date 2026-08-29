import fs from "fs";

import { isValidObjectId } from "mongoose";

import {
  isValidVerificationFile,
  resolveVerificationFile,
} from "../config/verificationUpload.js";
import { GuideProfile } from "../models/guide.model.js";
import { GuideVerification } from "../models/guideVerification.model.js";
import { Notification } from "../models/notification.model.js";
import {
  destroyCloudinaryAsset,
  getPrivateDownloadUrl,
  isCloudinaryAsset,
  uploadAuthenticatedDocument,
} from "../services/media.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendEmail } from "../utils/sendEmail.js";

const IDENTITY_DOCUMENT_TYPES = new Set(["national_id", "passport"]);

async function removeStoredFile(storageKey) {
  if (!storageKey) return;
  await fs.promises.unlink(resolveVerificationFile(storageKey)).catch(() => {});
}

function getVerificationFolder(guideProfileId) {
  const environment = String(process.env.NODE_ENV || "development")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, "-");
  return `nefru/${environment}/guide-verification/${guideProfileId}`;
}

function normalizeCloudinaryAsset(asset = {}) {
  return {
    provider: "cloudinary",
    assetId: asset.assetId || asset.asset_id || "",
    publicId: asset.publicId || asset.public_id || "",
    resourceType: asset.resourceType || asset.resource_type || "",
    deliveryType: asset.deliveryType || asset.type || "authenticated",
    format: asset.format || "",
    bytes: Number(asset.bytes) || 0,
  };
}

function getStoredAsset(document) {
  return {
    provider:
      document?.provider ||
      (document?.assetId || document?.publicId ? "cloudinary" : "local"),
    storageKey: document?.storageKey || "",
    assetId: document?.assetId || "",
    publicId: document?.publicId || "",
    resourceType: document?.resourceType || "",
    deliveryType: document?.deliveryType || "",
    format: document?.format || "",
    bytes: Number(document?.bytes) || 0,
  };
}

async function destroyStoredAsset(asset, options = {}) {
  if (!asset) return;

  if (isCloudinaryAsset(asset)) {
    await destroyCloudinaryAsset(asset, options);
    return;
  }

  await removeStoredFile(asset.storageKey);
}

async function destroyStoredAssetSafely(asset, options = {}) {
  try {
    await destroyStoredAsset(asset, options);
  } catch (error) {
    console.error("Verification asset could not be deleted:", error.message);
  }
}

async function uploadVerificationAsset(file, guideProfileId) {
  const uploadedAsset = await uploadAuthenticatedDocument(file, {
    folder: getVerificationFolder(guideProfileId),
  });
  const asset = normalizeCloudinaryAsset(uploadedAsset);

  if (!isCloudinaryAsset(asset)) {
    const error = new Error("Cloudinary returned invalid verification asset data");
    error.statusCode = 502;
    throw error;
  }

  return asset;
}

function hasRequiredDocuments(documents = []) {
  return documents.some((document) =>
    IDENTITY_DOCUMENT_TYPES.has(document.documentType),
  );
}

function serializeVerification(guideProfile, verification) {
  return {
    id: verification?._id,
    verificationStatus: guideProfile.verificationStatus,
    rejectionReason: guideProfile.rejectionReason || "",
    documents: (verification?.documents || []).map((document) => ({
      id: document._id,
      documentType: document.documentType,
      provider: document.provider || "local",
      originalName: document.originalName,
      mimeType: document.mimeType,
      format: document.format || "",
      bytes: Number(document.bytes) || 0,
      uploadedAt: document.uploadedAt,
      replacedAt: document.replacedAt,
    })),
    requestedChanges: (verification?.requestedChanges || []).map((change) => ({
      id: change._id,
      documentType: change.documentType,
      message: change.message,
      resolvedAt: change.resolvedAt,
    })),
    submittedAt: verification?.submittedAt || null,
    reviewedAt: verification?.reviewedAt || null,
  };
}

async function getGuideProfile(userId) {
  return GuideProfile.findOne({ user: userId }).select("+rejectionReason");
}

async function getPrivateVerification(guideProfileId) {
  return GuideVerification.findOne({ guideProfile: guideProfileId }).select(
    "+documents +documents.storageKey +documents.assetId +documents.publicId " +
      "+documents.resourceType +documents.deliveryType +requestedChanges +reviewHistory",
  );
}

async function createAccountNotificationSafely(userId, title, message, status) {
  try {
    await Notification.create({
      user: userId,
      type: "account",
      title,
      message,
      link: "/guide/verification",
      entityType: "user",
      entityId: userId,
      metadata: { verificationStatus: status },
    });
  } catch (error) {
    console.error("Verification notification could not be created:", error.message);
  }
}

async function sendVerificationEmailSafely(email, subject, message) {
  try {
    await sendEmail({ email, subject, message });
  } catch (error) {
    console.error("Verification email could not be sent:", error.message);
  }
}

export const getMyVerification = asyncHandler(async (req, res) => {
  const guideProfile = await getGuideProfile(req.user._id);

  if (!guideProfile) {
    res.status(404);
    throw new Error("Guide profile not found");
  }

  const verification = await getPrivateVerification(guideProfile._id);

  res.status(200).json({
    success: true,
    data: {
      verification: serializeVerification(guideProfile, verification),
    },
  });
});

export const uploadVerificationDocument = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error("Verification document is required");
  }

  if (!(await isValidVerificationFile(req.file))) {
    res.status(400);
    throw new Error("The uploaded file content is invalid");
  }

  const guideProfile = await getGuideProfile(req.user._id);

  if (!guideProfile) {
    res.status(404);
    throw new Error("Guide profile not found");
  }

  if (!["draft", "rejected"].includes(guideProfile.verificationStatus)) {
    res.status(409);
    throw new Error("Documents cannot be uploaded in the current state");
  }

  let verification = await getPrivateVerification(guideProfile._id);

  if (
    verification?.documents.some(
      (document) => document.documentType === req.body.documentType,
    )
  ) {
    res.status(409);
    throw new Error("This document type already exists; replace it instead");
  }

  let uploadedAsset;

  try {
    uploadedAsset = await uploadVerificationAsset(req.file, guideProfile._id);
    const documentData = {
      documentType: req.body.documentType,
      storageKey: "",
      ...uploadedAsset,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
    };

    if (!verification) {
      verification = await GuideVerification.create({
        guideProfile: guideProfile._id,
        documents: [documentData],
      });
    } else {
      verification.documents.push(documentData);
      await verification.save();
    }
  } catch (error) {
    if (uploadedAsset) {
      await destroyStoredAssetSafely(uploadedAsset, { invalidate: true });
    }
    throw error;
  }

  res.status(201).json({
    success: true,
    message: "Verification document uploaded successfully",
    data: {
      verification: serializeVerification(guideProfile, verification),
    },
  });
});

export const replaceVerificationDocument = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error("Replacement document is required");
  }

  if (!(await isValidVerificationFile(req.file))) {
    res.status(400);
    throw new Error("The uploaded file content is invalid");
  }

  if (!isValidObjectId(req.params.documentId)) {
    res.status(400);
    throw new Error("Invalid verification document id");
  }

  const guideProfile = await getGuideProfile(req.user._id);

  if (!guideProfile) {
    res.status(404);
    throw new Error("Guide profile not found");
  }

  if (!["draft", "rejected"].includes(guideProfile.verificationStatus)) {
    res.status(409);
    throw new Error("Documents cannot be changed in the current state");
  }

  const verification = await getPrivateVerification(guideProfile._id);
  const document = verification?.documents.id(req.params.documentId);

  if (!document) {
    res.status(404);
    throw new Error("Verification document not found");
  }

  if (document.documentType !== req.body.documentType) {
    res.status(400);
    throw new Error("Replacement document type must match the original");
  }

  const previousAsset = getStoredAsset(document);
  let uploadedAsset;

  try {
    uploadedAsset = await uploadVerificationAsset(req.file, guideProfile._id);

    document.provider = uploadedAsset.provider;
    document.storageKey = "";
    document.assetId = uploadedAsset.assetId;
    document.publicId = uploadedAsset.publicId;
    document.resourceType = uploadedAsset.resourceType;
    document.deliveryType = uploadedAsset.deliveryType;
    document.format = uploadedAsset.format;
    document.bytes = uploadedAsset.bytes;
    document.originalName = req.file.originalname;
    document.mimeType = req.file.mimetype;
    document.uploadedAt = new Date();
    document.replacedAt = new Date();

    for (const change of verification.requestedChanges) {
      if (change.documentType === document.documentType && !change.resolvedAt) {
        change.resolvedAt = new Date();
      }
    }

    await verification.save();
  } catch (error) {
    if (uploadedAsset) {
      await destroyStoredAssetSafely(uploadedAsset, { invalidate: true });
    }
    throw error;
  }

  await destroyStoredAssetSafely(previousAsset, { invalidate: true });

  res.status(200).json({
    success: true,
    message: "Verification document replaced successfully",
    data: {
      verification: serializeVerification(guideProfile, verification),
    },
  });
});

export const submitVerification = asyncHandler(async (req, res) => {
  const guideProfile = await getGuideProfile(req.user._id);

  if (!guideProfile) {
    res.status(404);
    throw new Error("Guide profile not found");
  }

  if (guideProfile.verificationStatus !== "draft") {
    res.status(409);
    throw new Error("Application has already been submitted");
  }

  const verification = await getPrivateVerification(guideProfile._id);

  if (!verification || !hasRequiredDocuments(verification.documents)) {
    res.status(400);
    throw new Error("A national ID or passport is required");
  }

  const submittedAt = new Date();
  guideProfile.verificationStatus = "pending";
  guideProfile.rejectionReason = "";
  verification.submittedAt = submittedAt;
  verification.reviewedAt = null;
  verification.reviewedBy = null;
  verification.reviewHistory.push({
    status: "pending",
    reviewedAt: submittedAt,
  });

  await guideProfile.save();
  await verification.save();

  await createAccountNotificationSafely(
    req.user._id,
    "Guide application received",
    "Your verification documents were submitted and are waiting for review.",
    "pending",
  );

  await sendVerificationEmailSafely(
    req.user.email,
    "Guide application received",
    "We received your guide verification documents. You can continue browsing Nefru while our team reviews them.",
  );

  res.status(200).json({
    success: true,
    message: "Verification application submitted successfully",
    data: {
      verificationStatus: guideProfile.verificationStatus,
      submittedAt,
    },
  });
});

export const resubmitVerification = asyncHandler(async (req, res) => {
  const guideProfile = await getGuideProfile(req.user._id);

  if (!guideProfile) {
    res.status(404);
    throw new Error("Guide profile not found");
  }

  if (guideProfile.verificationStatus !== "rejected") {
    res.status(409);
    throw new Error("Only rejected applications can be resubmitted");
  }

  const verification = await getPrivateVerification(guideProfile._id);

  if (!verification || !hasRequiredDocuments(verification.documents)) {
    res.status(400);
    throw new Error("A national ID or passport is required");
  }

  const unresolvedChanges = verification.requestedChanges.filter(
    (change) => !change.resolvedAt,
  );

  if (unresolvedChanges.length > 0) {
    res.status(400);
    throw new Error("All requested document changes must be completed first");
  }

  const hasReplacementAfterReview = verification.documents.some(
    (document) =>
      document.replacedAt &&
      (!verification.reviewedAt || document.replacedAt > verification.reviewedAt),
  );

  if (!hasReplacementAfterReview) {
    res.status(400);
    throw new Error("Replace at least one rejected document before resubmitting");
  }

  const submittedAt = new Date();
  guideProfile.verificationStatus = "pending";
  guideProfile.rejectionReason = "";
  verification.submittedAt = submittedAt;
  verification.reviewedAt = null;
  verification.reviewedBy = null;
  verification.reviewHistory.push({
    status: "pending",
    reviewedAt: submittedAt,
  });

  await guideProfile.save();
  await verification.save();

  await createAccountNotificationSafely(
    req.user._id,
    "Guide application resubmitted",
    "Your updated verification documents were sent for another review.",
    "pending",
  );

  await sendVerificationEmailSafely(
    req.user.email,
    "Guide application resubmitted",
    "We received your updated guide verification documents and will review them again.",
  );

  res.status(200).json({
    success: true,
    message: "Verification application resubmitted successfully",
    data: {
      verificationStatus: guideProfile.verificationStatus,
      submittedAt,
    },
  });
});

export const downloadVerificationDocument = asyncHandler(async (req, res) => {
  if (!isValidObjectId(req.params.documentId)) {
    res.status(400);
    throw new Error("Invalid verification document id");
  }

  let verificationQuery = GuideVerification.findOne({
    "documents._id": req.params.documentId,
  });

  if (req.user.role === "guide") {
    const guideProfile = await GuideProfile.findOne({ user: req.user._id }).select(
      "_id",
    );

    if (!guideProfile) {
      res.status(404);
      throw new Error("Guide profile not found");
    }

    verificationQuery = GuideVerification.findOne({
      guideProfile: guideProfile._id,
      "documents._id": req.params.documentId,
    });
  } else if (req.user.role !== "admin") {
    res.status(403);
    throw new Error("You do not have permission to view this document");
  }

  const verification = await verificationQuery.select(
    "+documents +documents.storageKey +documents.assetId +documents.publicId " +
      "+documents.resourceType +documents.deliveryType",
  );
  const document = verification?.documents.id(req.params.documentId);

  if (!document) {
    res.status(404);
    throw new Error("Verification document not found");
  }

  const storedAsset = getStoredAsset(document);

  if (isCloudinaryAsset(storedAsset)) {
    const signedDownload = await getPrivateDownloadUrl(storedAsset, {
      expiresInSeconds: 60,
      attachment: document.originalName,
    });
    const downloadUrl =
      typeof signedDownload === "string"
        ? signedDownload
        : signedDownload?.url || signedDownload?.secureUrl;

    if (!downloadUrl) {
      const error = new Error("Unable to create a verification download link");
      error.statusCode = 502;
      throw error;
    }

    res.set("Cache-Control", "no-store");
    res.set("Referrer-Policy", "no-referrer");
    return res.redirect(302, downloadUrl);
  }

  if (!storedAsset.storageKey) {
    res.status(404);
    throw new Error("Stored verification file not found");
  }

  const filePath = resolveVerificationFile(storedAsset.storageKey);

  if (!fs.existsSync(filePath)) {
    res.status(404);
    throw new Error("Stored verification file not found");
  }

  res.download(filePath, document.originalName);
});
