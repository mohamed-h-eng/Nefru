import { Trip } from "../models/trip.model.js";
import { GuideProfile } from "../models/guide.model.js";
import { Booking } from "../models/booking.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";
import { normalizeTripSchedule } from "../utils/tripSchedule.js";
import {
  destroyCloudinaryAssets,
  isCloudinaryAsset,
  uploadPublicImage,
} from "../services/media.service.js";

const ALLOWED_STATUSES = ["draft", "reviewing", "active"];

function getTripSummary(trip) {
  return {
    id: trip._id,
    title: trip.title,
    description: trip.description,
    longDescription: trip.longDescription || trip.description,
    location: trip.location,
    coordinates: trip.coordinates,
    price: trip.price,
    currency: "USD",
    duration: trip.duration,
    image: trip.image,
    category: trip.category,
    status: trip.status || "draft",
    statusText:
      trip.status === "reviewing"
        ? "Reviewing"
        : trip.status === "active"
          ? "Active"
          : "Draft",
    groupSize: trip.groupSize || 12,
    actionLabel: trip.status === "draft" ? "Continue" : "Manage",
    highlights: trip.highlights || [],
    reviews: trip.reviews || [],
    gallery: trip.gallery || [],
    schedule: normalizeTripSchedule(trip.schedule, trip.groupSize || 1),
    createdAt: trip.createdAt,
    updatedAt: trip.updatedAt,
  };
}

function canManageTrip(user, trip) {
  if (!user || !trip) return false;
  if (user.role === "admin") return true;
  return trip.guide?.toString() === user._id?.toString();
}

function toPlainAsset(asset) {
  if (!asset) return null;
  return typeof asset.toObject === "function"
    ? asset.toObject({ depopulate: true })
    : { ...asset };
}

function normalizeUploadedAsset(asset, slot) {
  const normalized = {
    provider: "cloudinary",
    url: asset?.url || asset?.secureUrl || asset?.secure_url || "",
    publicId: asset?.publicId || asset?.public_id || "",
    assetId: asset?.assetId || asset?.asset_id || "",
    resourceType: asset?.resourceType || asset?.resource_type || "image",
    deliveryType: asset?.deliveryType || asset?.type || "upload",
    format: asset?.format || "",
  };

  if (!normalized.url || !normalized.publicId) {
    throw new Error("Cloudinary returned incomplete image metadata");
  }

  if (Number.isInteger(slot)) normalized.slot = slot;
  return normalized;
}

function parseGalleryIndexes(value, fileCount) {
  if (fileCount === 0) return [];

  let parsed = value;
  if (typeof parsed === "string") {
    try {
      parsed = JSON.parse(parsed);
    } catch {
      parsed = parsed.split(",").map((item) => item.trim());
    }
  }

  if (!Array.isArray(parsed) || parsed.length === 0) return null;
  if (parsed.length !== fileCount) {
    throw new Error("Each gallery image must have a matching gallery index");
  }

  const indexes = parsed.map((value) => Number(value));
  const valid = indexes.every(
    (index) => Number.isInteger(index) && index >= 0 && index < 6,
  );

  if (!valid || new Set(indexes).size !== indexes.length) {
    throw new Error("Gallery indexes must be unique integers from 0 to 5");
  }

  return indexes;
}

function getFallbackGalleryIndexes(gallery, fileCount) {
  const indexes = [];

  for (let index = 0; index < 6 && indexes.length < fileCount; index += 1) {
    if (!gallery[index]) indexes.push(index);
  }

  for (let index = 0; index < 6 && indexes.length < fileCount; index += 1) {
    if (!indexes.includes(index)) indexes.push(index);
  }

  return indexes;
}

async function rollbackUploadedAssets(assets) {
  const cloudinaryAssets = assets.filter((asset) => isCloudinaryAsset(asset));
  if (cloudinaryAssets.length === 0) return;

  try {
    await destroyCloudinaryAssets(cloudinaryAssets, { invalidate: true });
  } catch (error) {
    console.error("Trip media rollback failed:", error.message);
  }
}

/**
 * @desc Get all trips with search and filter capabilities
 * @route GET /api/trips
 * @access Public
 */
export const getAllTrips = asyncHandler(async (req, res) => {
  const { search, category, location } = req.query;

  const query = { status: "active" };

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  if (category) {
    query.category = category;
  }

  if (location) {
    query.location = { $regex: location, $options: "i" };
  }

  const trips = await Trip.find(query)
    .populate("guide", "email status")
    .sort({ createdAt: -1 })
    .lean();

  const guideUserIds = trips
    .map((trip) => trip.guide?._id)
    .filter(Boolean);
  const guideProfiles = await GuideProfile.find({
    user: { $in: guideUserIds },
  })
    .select("user fullName avatar verificationStatus")
    .lean();
  const profilesByUser = new Map(
    guideProfiles.map((profile) => [profile.user.toString(), profile]),
  );
  const tripsWithGuides = trips.map((trip) => {
    const guideProfile = trip.guide
      ? profilesByUser.get(trip.guide._id.toString())
      : null;

    return {
      ...trip,
      currency: "USD",
      schedule: normalizeTripSchedule(trip.schedule, trip.groupSize || 1),
      guide: trip.guide
        ? {
            id: trip.guide._id,
            email: trip.guide.email,
            status: trip.guide.status,
            fullName: guideProfile?.fullName || "",
            avatar: guideProfile?.avatar || "",
            verified: guideProfile?.verificationStatus === "approved",
          }
        : null,
    };
  });

  res.status(200).json({
    success: true,
    count: tripsWithGuides.length,
    data: tripsWithGuides,
  });
});

/**
 * @desc Get a single trip by ID with full details including guide info
 * @route GET /api/trips/:id
 * @access Public
 */
export const getTripById = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400);
    throw new Error("Invalid trip ID");
  }

  const trip = await Trip.findById(req.params.id)
    .populate("guide", "email status")
    .lean();

  if (!trip) {
    res.status(404);
    throw new Error("Trip not found");
  }

  const guideProfile = trip.guide
    ? await GuideProfile.findOne({ user: trip.guide._id })
        .select(
          "fullName avatar verificationStatus rating reviewsCount about yearsExperience languages specialties",
        )
        .lean()
    : null;

  const tripResponse = {
    id: trip._id,
    title: trip.title,
    description: trip.description,
    longDescription: trip.longDescription || trip.description,
    location: trip.location,
    coordinates: trip.coordinates,
    price: trip.price,
    currency: "USD",
    duration: trip.duration,
    image: trip.image,
    category: trip.category,
    status: trip.status || "draft",
    groupSize: trip.groupSize || 12,
    schedule: normalizeTripSchedule(trip.schedule, trip.groupSize || 1),
    gallery: trip.gallery || [],
    rating: trip.rating || guideProfile?.rating || 0,
    reviewsCount: trip.reviewsCount || 0,
    highlights: trip.highlights || [],
    reviews: trip.reviews || [],
    date: trip.createdAt
      ? new Date(trip.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })
      : "N/A",
    guide: {
      id: trip.guide?._id || null,
      name: guideProfile?.fullName || "Local Guide",
      avatar: guideProfile?.avatar || "",
      badge: `${guideProfile?.yearsExperience || 0}+ years experience`,
      rating: guideProfile?.rating || 0,
      reviewsCount: guideProfile?.reviewsCount || 0,
      about: guideProfile?.about || "No bio available",
      verified: guideProfile?.verificationStatus === "approved",
    },
  };

  res.status(200).json({
    success: true,
    data: tripResponse,
  });
});

/**
 * @desc Create a new trip
 * @route POST /api/trips
 * @access Private (GuideProfile/Admin)
 */
export const createTrip = asyncHandler(async (req, res) => {
  if (req.user.role !== "guide" && req.user.role !== "admin") {
    res.status(403);
    throw new Error("Only guides and admins can create tours");
  }

  const {
    title,
    description,
    longDescription,
    location,
    coordinates,
    price,
    duration,
    category,
    groupSize,
    schedule,
  } = req.body;

  const invalid =
    !title ||
    !description ||
    !location ||
    !price ||
    !duration ||
    !category;

  if (invalid) {
    res.status(400);
    throw new Error(
      "Please provide title, description, location, price, duration and category"
    );
  }

  const resolvedCoordinates =
    Number.isFinite(Number(coordinates?.lat)) && Number.isFinite(Number(coordinates?.lng))
      ? { lat: Number(coordinates.lat), lng: Number(coordinates.lng) }
      : { lat: 30.0444, lng: 31.2357 };

  const trip = await Trip.create({
    title,
    description,
    longDescription: longDescription || description,
    location,
    coordinates: resolvedCoordinates,
    price,
    currency: "USD",
    duration,
    category,
    groupSize: groupSize || 12,
    schedule: schedule || { dates: [], slots: [] },
    guide: req.user._id,
    status: "draft",
  });

  res.status(201).json({
    success: true,
    message: "Trip created successfully",
    data: getTripSummary(trip),
  });
});
/**
 * @desc Get tours for the logged-in guide
 * @route GET /api/trips/guide/me
 * @access Private (GuideProfile)
 */
export const getMyGuideTrips = asyncHandler(async (req, res) => {
  if (req.user.role !== "guide" && req.user.role !== "admin") {
    res.status(403);
    throw new Error("Only guides can view their tours");
  }

  const { status } = req.query;
  const query = { guide: req.user._id };

  if (status && ALLOWED_STATUSES.includes(status)) {
    query.status = status;
  }

  const trips = await Trip.find(query).sort({ createdAt: -1 }).lean();

  const counts = {
    all: await Trip.countDocuments({ guide: req.user._id }),
    active: await Trip.countDocuments({ guide: req.user._id, status: "active" }),
    reviewing: await Trip.countDocuments({ guide: req.user._id, status: "reviewing" }),
    draft: await Trip.countDocuments({ guide: req.user._id, status: "draft" }),
  };

  res.status(200).json({
    success: true,
    data: {
      tours: trips.map(getTripSummary),
      counts,
    },
  });
});

/**
 * @desc Update a guide tour
 * @route PATCH /api/trips/:id
 * @access Private (GuideProfile/Admin)
 */
export const updateMyTrip = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400);
    throw new Error("Invalid trip ID");
  }

  const trip = await Trip.findById(req.params.id);

  if (!trip) {
    res.status(404);
    throw new Error("Trip not found");
  }

  if (!canManageTrip(req.user, trip)) {
    res.status(403);
    throw new Error("You can only edit your own tours");
  }

  const allowedFields = [
    "title",
    "description",
    "longDescription",
    "location",
    "price",
    "duration",
    "category",
    "groupSize",
    "schedule",
    "highlights",
  ];

  if (req.body.schedule !== undefined) {
    const nextSchedule = normalizeTripSchedule(req.body.schedule, req.body.groupSize || trip.groupSize || 1);
    const reservations = await Booking.aggregate([
      {
        $match: {
          trip: trip._id,
          $or: [
            { status: "confirmed" },
            { status: "pending_payment", holdExpiresAt: { $gt: new Date() } },
          ],
        },
      },
      { $group: { _id: "$occurrenceKey", reserved: { $sum: 1 } } },
    ]);
    const nextSlots = new Map(nextSchedule.slots.map((slot) => [slot.occurrenceKey, slot]));
    for (const reservation of reservations) {
      const nextSlot = nextSlots.get(reservation._id);
      if (!nextSlot) {
        res.status(409);
        throw new Error(
          "A time slot with active bookings cannot be removed. Cancel it from Booking Management first.",
        );
      }
      if (nextSlot.capacity < reservation.reserved) {
        res.status(409);
        throw new Error(
          `Capacity cannot be lower than ${reservation.reserved} reserved place(s).`,
        );
      }
    }
    req.body.schedule = nextSchedule;
  }

  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      if (field === "highlights") {
        trip.highlights = Array.isArray(req.body.highlights)
          ? req.body.highlights.map((item) =>
              typeof item === "string" ? { title: item } : item,
            )
          : [];
        return;
      }

      trip[field] = req.body[field];
    }
  });

  await trip.save();

  res.status(200).json({
    success: true,
    message: "Trip updated successfully",
    data: getTripSummary(trip),
  });
});

/**
 * @desc Change trip review status
 * @route PATCH /api/trips/:id/status
 * @access Private (GuideProfile/Admin)
 */
export const changeTripStatus = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400);
    throw new Error("Invalid trip ID");
  }

  const trip = await Trip.findById(req.params.id);

  if (!trip) {
    res.status(404);
    throw new Error("Trip not found");
  }

  if (!canManageTrip(req.user, trip)) {
    res.status(403);
    throw new Error("You can only change your own tours");
  }

  const { status } = req.body;

  if (!status || !ALLOWED_STATUSES.includes(status)) {
    res.status(400);
    throw new Error("Please provide a valid status");
  }

  trip.status = status;
  await trip.save();

  res.status(200).json({
    success: true,
    message: "Trip status updated",
    data: getTripSummary(trip),
  });
});

/**
 * @desc Validate a tour before accepting multipart media
 * @route POST /api/trips/:id/upload-media
 * @access Private (GuideProfile/Admin)
 */
export const authorizeTripMediaUpload = asyncHandler(async (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400);
    throw new Error("Invalid trip ID");
  }

  const trip = await Trip.findById(req.params.id).select(
    "+imageAsset +galleryAssets",
  );

  if (!trip) {
    res.status(404);
    throw new Error("Trip not found");
  }

  if (!canManageTrip(req.user, trip)) {
    res.status(403);
    throw new Error("You can only edit your own tours");
  }

  req.trip = trip;
  next();
});

/**
 * @desc Upload and persist tour media in one operation
 * @route POST /api/trips/:id/upload-media
 * @access Private (GuideProfile/Admin)
 */
export const updateTripMedia = asyncHandler(async (req, res) => {
  const trip = req.trip;
  if (!trip) {
    res.status(500);
    throw new Error("Trip media upload was not initialized");
  }

  const files = req.files || {};
  const coverImage = files.coverImage?.[0] || null;
  const galleryImages = files.galleryImages || [];

  if (!coverImage && galleryImages.length === 0) {
    res.status(400);
    throw new Error("Choose at least one tour image to upload");
  }

  let galleryIndexes;
  try {
    galleryIndexes = parseGalleryIndexes(
      req.body.galleryIndexes ?? req.body.gallerySlots,
      galleryImages.length,
    );
  } catch (error) {
    res.status(400);
    throw error;
  }

  const currentGallery = Array.isArray(trip.gallery)
    ? trip.gallery.slice(0, 6)
    : [];
  const targetGalleryIndexes =
    galleryIndexes ||
    getFallbackGalleryIndexes(currentGallery, galleryImages.length);
  const folder = `nefru/trips/${trip._id}`;
  const uploadJobs = [];

  if (coverImage) {
    uploadJobs.push({
      kind: "cover",
      upload: () =>
        uploadPublicImage(coverImage, { folder: `${folder}/cover` }),
    });
  }

  galleryImages.forEach((file, index) => {
    uploadJobs.push({
      kind: "gallery",
      slot: targetGalleryIndexes[index],
      upload: () =>
        uploadPublicImage(file, { folder: `${folder}/gallery` }),
    });
  });

  const settledUploads = await Promise.allSettled(
    uploadJobs.map((job) => Promise.resolve().then(job.upload)),
  );
  const rawUploadedAssets = settledUploads
    .filter((result) => result.status === "fulfilled")
    .map((result) => result.value);
  const failedUpload = settledUploads.find(
    (result) => result.status === "rejected",
  );

  if (failedUpload) {
    await rollbackUploadedAssets(rawUploadedAssets);
    throw failedUpload.reason;
  }

  let uploadedJobs;
  try {
    uploadedJobs = uploadJobs.map((job, index) => ({
      ...job,
      asset: normalizeUploadedAsset(
        settledUploads[index].value,
        job.kind === "gallery" ? job.slot : undefined,
      ),
    }));
  } catch (error) {
    await rollbackUploadedAssets(rawUploadedAssets);
    throw error;
  }

  const replacedAssets = [];
  let uploadedCoverAsset = null;
  const uploadedGalleryAssets = [];

  try {
    const previousCoverAsset = toPlainAsset(trip.imageAsset);
    const previousGalleryAssets = (trip.galleryAssets || []).map(toPlainAsset);
    const previousGalleryAssetsBySlot = new Map(
      previousGalleryAssets.map((asset, index) => [
        Number.isInteger(asset?.slot) ? asset.slot : index,
        asset,
      ]),
    );
    const nextGallerySlots = currentGallery.map((url, slot) => ({
      url,
      asset: previousGalleryAssetsBySlot.get(slot) || null,
    }));

    for (const job of uploadedJobs) {
      if (job.kind === "cover") {
        uploadedCoverAsset = job.asset;
        if (isCloudinaryAsset(previousCoverAsset)) {
          replacedAssets.push(previousCoverAsset);
        }
        trip.image = job.asset.url;
        trip.imageAsset = job.asset;
        continue;
      }

      const previousAtSlot = nextGallerySlots[job.slot]?.asset;
      if (isCloudinaryAsset(previousAtSlot)) replacedAssets.push(previousAtSlot);
      nextGallerySlots[job.slot] = { url: job.asset.url, asset: job.asset };
      uploadedGalleryAssets.push(job.asset);
    }

    const denseGallerySlots = nextGallerySlots.filter((item) => item?.url);
    trip.gallery = denseGallerySlots.map((item) => item.url);
    trip.galleryAssets = denseGallerySlots.flatMap((item, slot) =>
      item.asset && isCloudinaryAsset(item.asset)
        ? [{ ...item.asset, slot }]
        : [],
    );

    await trip.save();
  } catch (error) {
    await rollbackUploadedAssets(uploadedJobs.map((job) => job.asset));
    throw error;
  }

  if (replacedAssets.length > 0) {
    try {
      await destroyCloudinaryAssets(replacedAssets, { invalidate: true });
    } catch (error) {
      console.error("Replaced trip media could not be deleted:", error.message);
    }
  }

  res.status(200).json({
    success: true,
    message: "Images uploaded successfully",
    data: {
      coverImage: uploadedCoverAsset?.url || "",
      galleryImages: uploadedGalleryAssets.map((asset) => asset.url),
    },
  });
});
