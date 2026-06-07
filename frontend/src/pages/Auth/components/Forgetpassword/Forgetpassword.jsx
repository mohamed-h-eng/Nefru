import { Button } from "../../../../shared/components/Button/Button";
import { Input } from "../../../../shared/components/Inputs/Inputs";
// import { BsFillEnvelopeFill } from "react-icons/bs";
import Icons from "../../../../assets/icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./Forgetpassword.module.css";
import Logo_Light from "../../../../assets/images/Logo_Light.png";

export default function Forgetpassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  return (
    <div className={styles.StepOneContainer}>
      <div className={styles.content}>
        <img src={Logo_Light} alt="Logo-light" className={styles.logo} />
        <h1 className={styles.RecoveryTitle}>Password Recovery</h1>
        <p className={styles.RecoveryText}>
          Don’t worry! We’ll help you get back in.
        </p>
        <div className={styles.formGroup}>
          <Input
            id="email"
            className={styles.recoveryInputContainer}
            inputClassName={styles.recoveryInput}
            icon={
              <Icons.EmailOutline  />
            }
            placeholder="you@email.com"
            value={email}
            setValue={setEmail}
            type="email"
            title="Email address"
          />
        </div>

        <Button
          type="primary"
          onClick={() => navigate("/auth/reset-password")}
        >
          Send Reset Link
        </Button>
      </div>
    </div>
  );
}
