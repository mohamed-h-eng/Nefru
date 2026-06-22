import { Link } from "react-router-dom";
import { FiCompass, FiHome } from "react-icons/fi";

import { Button } from "../components/Button/Button";
import styles from "./NotFound.module.css";
import Logo_Light from "../../assets/images/Logo_Light.png";
import illustration from "../../assets/images/not-found-illustration.png";

export default function NotFound() {
  return (
    <main className={styles.page}>
      <section className={styles.card} aria-labelledby="not-found-title">
        <div className={styles.logoWrapper}>
          <img src={Logo_Light} alt="Nefru" className={styles.logo} />
        </div>

        <div className={styles.content}>
          <div className={styles.textContent}>
            <p className={styles.errorCode}>404</p>

            <h1 id="not-found-title" className={styles.title}>
              Oops! This page got lost in the sands.
            </h1>

            <p className={styles.description}>
              The page you’re looking for doesn’t exist, was moved, or may have
              never existed.
            </p>

            <div className={styles.actions}>
              <Link to="/" className={styles.actionLink}>
                <Button type="secondary" className={styles.button} icon={<FiHome />}>
                  Back to Home
                </Button>
              </Link>

              <Link to="/user/discover" className={styles.actionLink}>
                <Button type="outline" className={styles.button} icon={<FiCompass />}>
                  Explore Tours
                </Button>
              </Link>
            </div>
          </div>

          <div className={styles.imageWrapper}>
            <img
              src={illustration}
              alt="Compass map with pyramids"
              className={styles.illustration}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
