import { useNavigate } from "react-router-dom";
import styles from "./TourApprove.module.css";

function TourApprove({ approveData, onHome, onContactSupport }) {
  const navigate = useNavigate();

  const data = approveData || {
    title: "All Done",
    message: "Waiting for admin review, it should take 24 to 48 hours",
    supportText: "Contact Support ?",
    buttonText: "Home",
  };

  function goHome() {
    if (onHome) {
      onHome();
      return;
    }

    navigate("/guide");
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>{data.title}</h1>
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

        <section className={styles.messageBox}>
          <p>{data.message}</p>

          <button
            type="button"
            className={styles.supportButton}
            onClick={onContactSupport}
          >
            {data.supportText}
          </button>
        </section>
      </main>

      <footer className={styles.footer}>
        <button type="button" onClick={goHome}>
          {data.buttonText}
        </button>
      </footer>
    </div>
  );
}

export default TourApprove;