import { useEffect, useRef, useState } from "react";
import styles from "./TourMedia.module.css";
import {
  FaArrowLeft,
  FaImage,
  FaPlus,
  FaTrash,
  FaCircleCheck,
  FaDroplet,
  FaCar,
  FaTicket,
  FaUtensils,
  FaWifi,
} from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import { API_BASE_URL, apiRequest } from "../../../services/api";
import {
  getImageUploadError,
  IMAGE_UPLOAD_ACCEPT,
} from "../../../utils/mediaUpload";

const API_ORIGIN = API_BASE_URL.startsWith("http")
  ? new URL(API_BASE_URL).origin
  : window.location.origin;

function getImageSrc(image) {
  if (!image) return "";
  if (image.startsWith("http") || image.startsWith("data:") || image.startsWith("blob:")) {
    return image;
  }

  if (image.startsWith("/uploads")) {
    return `${API_ORIGIN}${image}`;
  }

  return `${API_ORIGIN}/uploads/${image}`;
}

function UploadPreview({ file, existingImage, alt }) {
  const imageRef = useRef(null);

  useEffect(() => {
    if (!file) return undefined;

    const nextObjectUrl = URL.createObjectURL(file);
    if (imageRef.current) imageRef.current.src = nextObjectUrl;

    return () => URL.revokeObjectURL(nextObjectUrl);
  }, [file]);

  return (
    <img
      ref={imageRef}
      src={file ? undefined : getImageSrc(existingImage)}
      alt={alt}
    />
  );
}

function TourMedia({ mediaData = {}, tourId, onBack }) {
  const navigate = useNavigate();
  const location = useLocation();
  const tripId = tourId || location.state?.tripId;

  const [coverPhoto, setCoverPhoto] = useState(null);
  const [existingCoverPhoto, setExistingCoverPhoto] = useState("");
  const [galleryPhotos, setGalleryPhotos] = useState([]);
  const [existingGalleryPhotos, setExistingGalleryPhotos] = useState([]);
  const [highlights, setHighlights] = useState(mediaData.highlights || ["", ""]);
  const [included, setIncluded] = useState(mediaData.included || ["Bottled Water", "Transportation"]);
  const [customIncluded, setCustomIncluded] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingTrip, setLoadingTrip] = useState(Boolean(tripId));
  const submitLockRef = useRef(false);

  const allIncluded = [
    { name: "Bottled Water", icon: <FaDroplet /> },
    { name: "Transportation", icon: <FaCar /> },
    { name: "Entrance Fees", icon: <FaTicket /> },
    { name: "Meals", icon: <FaUtensils /> },
    { name: "Wi-Fi", icon: <FaWifi /> },
  ];
  const galleryUploadedCount = Array.from({ length: 6 }).filter(
    (_, index) => galleryPhotos[index] || existingGalleryPhotos[index],
  ).length;

  useEffect(() => {
    async function loadTripMedia() {
      if (!tripId) return;

      setLoadingTrip(true);

      try {
        const response = await apiRequest(`/trips/${tripId}`);
        const trip = response?.data;

        setExistingCoverPhoto(trip.image || "");
        setExistingGalleryPhotos(Array.isArray(trip.gallery) ? trip.gallery.slice(0, 6) : []);
        setHighlights(
          Array.isArray(trip.highlights) && trip.highlights.length > 0
            ? trip.highlights.map((item) =>
                typeof item === "string" ? item : item.title || item.text || "",
              )
            : ["", ""],
        );
      } catch (error) {
        console.error(error);
        alert(error.message);
      } finally {
        setLoadingTrip(false);
      }
    }

    loadTripMedia();
  }, [tripId]);

  function chooseCover(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const validationError = getImageUploadError(file, "Cover photo");
    if (validationError) {
      e.target.value = "";
      alert(validationError);
      return;
    }

    setCoverPhoto(file);
  }

  function chooseGallery(index, e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const validationError = getImageUploadError(file, "Gallery photo");
    if (validationError) {
      e.target.value = "";
      alert(validationError);
      return;
    }

    const occupiedSlots = Array.from({ length: 6 }).filter(
      (_, slotIndex) => galleryPhotos[slotIndex] || existingGalleryPhotos[slotIndex],
    ).length;
    const isReplacingPhoto = Boolean(
      galleryPhotos[index] || existingGalleryPhotos[index],
    );
    if (!isReplacingPhoto && occupiedSlots >= 6) {
      e.target.value = "";
      alert("You can upload up to 6 gallery photos.");
      return;
    }

    setGalleryPhotos((prev) => {
      const next = [...prev];
      next[index] = file;
      return next.slice(0, 6);
    });
  }

  function changeHighlight(index, value) {
    const newHighlights = [...highlights];
    newHighlights[index] = value;
    setHighlights(newHighlights);
  }

  function addHighlight() {
    setHighlights([...highlights, ""]);
  }

  function deleteHighlight(index) {
    setHighlights(highlights.filter((_, i) => i !== index));
  }

  function toggleIncluded(name) {
    if (included.includes(name)) {
      setIncluded(included.filter((item) => item !== name));
    } else {
      setIncluded([...included, name]);
    }
  }

  function addCustomIncluded() {
    if (!customIncluded.trim()) return;
    setIncluded([...included, customIncluded]);
    setCustomIncluded("");
  }

  async function submitForm() {
    if (submitLockRef.current) return;
    submitLockRef.current = true;
    setLoading(true);

    try {
      if (!tripId) {
        navigate("/guide/tourapprove");
        return;
      }

      const formData = new FormData();
      const newGalleryEntries = galleryPhotos
        .map((file, index) => (file ? { file, index } : null))
        .filter(Boolean);

      if (coverPhoto) {
        formData.append("coverImage", coverPhoto);
      }

      newGalleryEntries.forEach(({ file }) => {
        formData.append("galleryImages", file);
      });

      if (newGalleryEntries.length > 0) {
        formData.append(
          "galleryIndexes",
          JSON.stringify(newGalleryEntries.map(({ index }) => index)),
        );
      }

      if (coverPhoto || newGalleryEntries.length > 0) {
        await apiRequest(`/trips/${tripId}/upload-media`, {
          method: "POST",
          body: formData,
        });
      }

      const payload = {
        highlights: highlights.filter(Boolean),
        longDescription: highlights.filter(Boolean).join(" | "),
      };

      await apiRequest(`/trips/${tripId}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      });

      navigate("/guide/tourapprove", { state: { tripId } });
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      submitLockRef.current = false;
      setLoading(false);
    }
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <button type="button" className={styles.backButton} onClick={onBack}>
          <FaArrowLeft />
        </button>
        <h1>Add Media</h1>
        <div className={styles.empty}></div>
      </header>

      <main className={styles.content}>
        <div className={styles.stepper}>
          <div className={styles.line}></div>
          <div className={styles.activeLine}></div>
          {[1, 2, 3, 4].map((step) => (
            <span
              key={step}
              className={`${styles.step} ${step <= 3 ? styles.activeStep : ""}`}
            >
              {step}
            </span>
          ))}
        </div>

        <p className={styles.intro}>
          Upload captivating photos and define the core highlights of your
          experience to attract travelers.
        </p>

        <section className={styles.section}>
          <h2>Cover Photo</h2>

          <label className={styles.coverBox}>
            <input type="file" accept={IMAGE_UPLOAD_ACCEPT} onChange={chooseCover} />
            {coverPhoto ? (
              <UploadPreview file={coverPhoto} alt="Cover preview" />
            ) : existingCoverPhoto ? (
              <UploadPreview
                existingImage={existingCoverPhoto}
                alt="Cover preview"
              />
            ) : (
              <>
                <FaImage className={styles.uploadIcon} />
                <strong>{loadingTrip ? "Loading cover photo..." : "Click to upload cover photo"}</strong>
                <span>High resolution (min 1920x1080) recommended.</span>
              </>
            )}
          </label>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionTitleRow}>
            <h2>Gallery Photos</h2>
            <span>{galleryUploadedCount} / 6 uploaded</span>
          </div>

          <div className={styles.galleryGrid}>
            {Array.from({ length: 6 }).map((_, index) => {
              const file = galleryPhotos[index];
              const existingImage = existingGalleryPhotos[index];

              return (
                <label key={index} className={styles.galleryItem}>
                  <input
                    type="file"
                    accept={IMAGE_UPLOAD_ACCEPT}
                    onChange={(e) => chooseGallery(index, e)}
                  />

                  {file ? (
                    <UploadPreview file={file} alt="Gallery preview" />
                  ) : existingImage ? (
                    <UploadPreview
                      existingImage={existingImage}
                      alt="Gallery preview"
                    />
                  ) : (
                    <FaPlus />
                  )}
                </label>
              );
            })}
          </div>
        </section>

        <div className={styles.divider}></div>

        <section className={styles.section}>
          <h2>Experience Highlights</h2>

          <div className={styles.highlightsList}>
            {highlights.map((item, index) => (
              <div key={index} className={styles.highlightRow}>
                <FaCircleCheck className={styles.checkIcon} />

                <input
                  type="text"
                  value={item}
                  placeholder={
                    index === 0
                      ? "e.g., Skip the line at the Great Pyramid"
                      : "e.g., Expert Egyptologist guide"
                  }
                  onChange={(e) => changeHighlight(index, e.target.value)}
                />

                <button type="button" onClick={() => deleteHighlight(index)}>
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>

          <button type="button" className={styles.addHighlight} onClick={addHighlight}>
            <FaPlus /> Add another highlight
          </button>
        </section>

        <section className={styles.section}>
          <h2>What's Included</h2>

          <div className={styles.includedBox}>
            <div className={styles.chips}>
              {allIncluded.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  className={`${styles.chip} ${
                    included.includes(item.name) ? styles.activeChip : ""
                  }`}
                  onClick={() => toggleIncluded(item.name)}
                >
                  {item.icon}
                  {item.name}
                </button>
              ))}
            </div>

            <div className={styles.customInput}>
              <input
                type="text"
                placeholder="Add custom inclusion..."
                value={customIncluded}
                onChange={(e) => setCustomIncluded(e.target.value)}
              />
              <button type="button" onClick={addCustomIncluded}>
                <FaPlus />
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <button
          type="button"
          onClick={submitForm}
          disabled={loading || loadingTrip}
          aria-busy={loading}
        >
          {loading ? "Saving..." : "Submit For Review"}
        </button>
      </footer>
    </div>
  );
}

export default TourMedia;
