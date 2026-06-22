import { useState } from "react";
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

function TourMedia({ mediaData = {}, tourId, onBack }) {
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [galleryPhotos, setGalleryPhotos] = useState([]);
  const [highlights, setHighlights] = useState(
    mediaData.highlights || ["", ""]
  );
  const [included, setIncluded] = useState(
    mediaData.included || ["Bottled Water", "Transportation"]
  );
  const [customIncluded, setCustomIncluded] = useState("");

  const allIncluded = [
    { name: "Bottled Water", icon: <FaDroplet /> },
    { name: "Transportation", icon: <FaCar /> },
    { name: "Entrance Fees", icon: <FaTicket /> },
    { name: "Meals", icon: <FaUtensils /> },
    { name: "Wi-Fi", icon: <FaWifi /> },
  ];

  function chooseCover(e) {
    setCoverPhoto(e.target.files[0]);
  }

  function chooseGallery(e) {
    const files = Array.from(e.target.files);
    setGalleryPhotos(files.slice(0, 6));
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
    const formData = new FormData();

    if (tourId) formData.append("tourId", tourId);
    if (coverPhoto) formData.append("coverPhoto", coverPhoto);

    galleryPhotos.forEach((file) => {
      formData.append("galleryPhotos", file);
    });

    formData.append("highlights", JSON.stringify(highlights));
    formData.append("included", JSON.stringify(included));

    await fetch("/api/tours/media", {
      method: "POST",
      body: formData,
    });
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
            <input type="file" accept="image/*" onChange={chooseCover} />
            {coverPhoto ? (
              <img src={URL.createObjectURL(coverPhoto)} alt="Cover preview" />
            ) : (
              <>
                <FaImage className={styles.uploadIcon} />
                <strong>Click to upload cover photo</strong>
                <span>High resolution (min 1920x1080) recommended.</span>
              </>
            )}
          </label>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionTitleRow}>
            <h2>Gallery Photos</h2>
            <span>{galleryPhotos.length} / 6 uploaded</span>
          </div>

          <label className={styles.galleryGrid}>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={chooseGallery}
            />

            {Array.from({ length: 6 }).map((_, index) => {
              const file = galleryPhotos[index];

              return (
                <div key={index} className={styles.galleryItem}>
                  {file ? (
                    <img src={URL.createObjectURL(file)} alt="Gallery preview" />
                  ) : (
                    <FaPlus />
                  )}
                </div>
              );
            })}
          </label>
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
        <button type="button" onClick={submitForm}>
          Submit For Review
        </button>
      </footer>
    </div>
  );
}

export default TourMedia;