import styles from "./CreateTour.module.css";
import { FaArrowLeft, FaChevronDown, FaPlus } from "react-icons/fa6";

function CreateTour({ tourData = {}, onBack, onNext }) {
  const categories = [
    "History & Culture",
    "Food & Culinary",
    "Adventure",
    "Luxury",
    "Nile Cruise",
    "Desert Safari",
  ];

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <button type="button" className={styles.backButton} onClick={onBack}>
          <FaArrowLeft />
        </button>

        <h1 className={styles.title}>Create Tour</h1>

        <div className={styles.headerSpace} />
      </header>

      <main className={styles.content}>
        <div className={styles.stepper}>
          <div className={`${styles.stepLine} ${styles.stepLineActive}`} />
          <div className={styles.stepLine} />

          <div className={`${styles.step} ${styles.stepActive}`}>1</div>
          <div className={styles.step}>2</div>
          <div className={styles.step}>3</div>
          <div className={styles.step}>4</div>
        </div>

        <section className={styles.card}>
          <div className={styles.formGroup}>
            <label className={styles.label}>TOUR TITLE</label>
            <input
              className={styles.input}
              type="text"
              placeholder="e.g., Hidden Gems of Cairo"
              defaultValue={tourData.title || ""}
            />
            <p className={styles.helperText}>Make it catchy and descriptive.</p>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>DESTINATION CITY</label>
            <div className={styles.selectBox}>
              <span>{tourData.city || "Select a city"}</span>
              <FaChevronDown />
            </div>
          </div>

          <div className={styles.separator} />

          <div className={styles.formGroup}>
            <div className={styles.sectionTop}>
              <div>
                <label className={styles.label}>CATEGORIES (SELECT UP TO 3)</label>
                <p className={styles.helperText}>
                  Help travelers filter and find your tour based on their interests.
                </p>
              </div>
            </div>

            <div className={styles.chipsGrid}>
              {categories.map((item) => (
                <button key={item} type="button" className={styles.chip}>
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.separator} />

          <div className={styles.formGroup}>
            <label className={styles.label}>DURATION</label>
            <div className={styles.durationRow}>
              <input
                className={styles.durationInput}
                type="text"
                placeholder="e.g. 4"
                defaultValue={tourData.durationValue || ""}
              />

              <div className={styles.toggleBox}>
                <button type="button" className={styles.toggleActive}>
                  Hours
                </button>
                <button type="button" className={styles.toggleItem}>
                  Days
                </button>
              </div>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>BASE PRICE (PER PERSON)</label>
            <div className={styles.priceBox}>
              <span className={styles.currency}>$</span>
              <input
                className={styles.priceInput}
                type="text"
                placeholder="0.00"
                defaultValue={tourData.price || ""}
              />
              <span className={styles.currencyLabel}>USD</span>
            </div>
          </div>

          <div className={styles.separator} />

          <div className={styles.formGroup}>
            <div className={styles.sectionTop}>
              <label className={styles.label}>TOUR DESCRIPTION</label>
              <span className={styles.counter}>0 / 1000</span>
            </div>

            <textarea
              className={styles.textarea}
              placeholder="Describe what makes this tour special. What will travelers experience? Highlight key sights and the overall atmosphere."
              defaultValue={tourData.description || ""}
            />
          </div>

          <div className={styles.actions}>
            <button type="button" className={styles.nextButton} onClick={onNext}>
              <FaPlus />
              Next Step
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default CreateTour;