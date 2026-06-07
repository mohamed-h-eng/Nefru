import { useNavigate } from "react-router-dom";
// import { FaHourglassHalf } from "react-icons/fa";
import Icons from "../../../../assets/icons";
import styles from "./ApplicationReceived.module.css";
import Logo_Light from "../../../../assets/images/Logo_Light.png";
import {Button }from '../../../../shared/components/Button/Button'

export default function ApplicationReceived() {
  const navigate = useNavigate();

  return (
    <div className={styles.pageContainer}>
      <div className={styles.card}>
        <img src={Logo_Light} alt="Nefru Logo" className={styles.logo} />

        <div className={styles.iconWrapper}>
          <Icons.HourglassHalf className={styles.hourglassIcon} />
        </div>

        <h1 className={styles.title}>Application Received!</h1>
        <p className={styles.subtitle}>Registration as a Tour Guide</p>

        <div className={styles.infoBox}>
          <p className={styles.infoText}>
            We have received your documents and license information.
          </p>
          <p className={styles.infoText}>
            Our team is currently verifying your details to ensure the safety
            and quality of our community. We will contact you shortly to
            complete any missing information.
          </p>
        </div>

        <Button type="primary" onClick={() => navigate("/auth/login")}>
          Got it, thank you
        </Button>
      </div>
    </div>
  );
}
