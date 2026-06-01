import { Button } from "../../../../shared/components/Button/Button";
import { InputIcon } from "../../../../shared/components/inputs/inputs";
import { BsFillEnvelopeFill } from "react-icons/bs";
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
        <h3 className={styles.StepTitle}>Step 1 of 2: Request Reset Link</h3>

        <div className={styles.formGroup}>
          <label className={styles.EmailLabel}>Email Address</label>

          <InputIcon
            id="email"
            className={styles.recoveryInputContainer}
            inputClassName={styles.recoveryInput}
            icon={
              <BsFillEnvelopeFill className="text-2xl text-(--color-secondary)" />
            }
            placeholder="you@email.com"
            value={email}
            setValue={setEmail}
            type="email"
            name="email"
          />
        </div>

        <ButtonBasic
          className={styles.stepOneBtn}
          onClick={() => navigate("/reset-password")}
        >
          Send Reset Link
        </ButtonBasic>

        <p className={styles.RememberText}>
          Remember your password?{" "}
          <span className={styles.LoginLink} onClick={() => navigate("/login")}>
            Log In
          </span>
        </p>
      </div>
    </div>
  );
}
