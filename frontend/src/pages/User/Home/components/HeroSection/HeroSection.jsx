import styles from "./HeroSection.module.css";

function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay} />

      <div className={styles.content}>
        <span className={styles.badge}>
          THE NEFRU COLLECTION
        </span>

        <h1>
          Unveil the Mysteries
          <br />
          of the Nile
        </h1>

        <p>
          Curated journeys through the cradle of civilization,
          where ancient wonders meet modern elegance.
        </p>
{/* 
        <div className={styles.searchCard}>
          <div className={styles.field}>
            <label>Destination</label>
            <input
              type="text"
              placeholder="Where to ?"
            />
          </div>

          <div className={styles.field}>
            <label>Date</label>
            <input
              type="date"
            />
          </div>

          <button>
            Search Experiences
          </button>
        </div> */}
      </div>
    </section>
  );
}

export default HeroSection;