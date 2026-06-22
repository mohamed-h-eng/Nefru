import styles from "./Footer.module.css";
import LogoDark from "../../assets/images/Logo_Dark.png";
import Icons from "../../assets/icons";

export default function Footer() {
  return (
    <footer className={`${styles.footer} container-fluid`}>
      
      <div className={`${styles.brand} d-flex align-items-center`}>
        <img src={LogoDark} alt="Nefru" className={styles.logo} />
      </div>

      <div className={`${styles.centerContent} d-flex flex-column align-items-center text-center`}>
        <p className={styles.tagline}>Unveiling the Timeless Wonders of the Nile.</p>
        <p className={styles.copyright}>© 2026 Nefru. All rights reserved.</p>
      </div>

      <div className={`${styles.socials} d-flex align-items-center`} aria-label="Social links">
        <a href="#" aria-label="Facebook" className={styles.socialLink}>
          <Icons.Facebook />
        </a>
        <a href="#" aria-label="Twitter X" className={styles.socialLink}>
          <Icons.Twitter />
        </a>
      </div>
    </footer>
  );
}
