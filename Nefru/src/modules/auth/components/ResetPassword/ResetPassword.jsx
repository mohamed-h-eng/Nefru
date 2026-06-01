import { FaCheckCircle, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Logo_Light from "../../../../assets/images/Logo_Light.png";
import styles from "./ResetPassword.module.css";
// import logo from "../../../assets/img/nefru-logo.png";
import { InputBasic } from "../../../../shared/components/inputs/inputs";
import {
  Button,
  ButtonIcon,
} from "../../../../shared/components/Button/Button";

export default function ResetPassword() {
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleResetPassword = () => {
    if (!newPassword || !confirmPassword) {
      alert("Please fill in both password fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords don't match. Please try again.");
      return;
    }

    navigate("/login");
  };

  return (
    <div className={styles.StepTwoContainer}>
      <div className={styles.content}>
        <img src={Logo_Light} alt="Logo-light" className={styles.logo} />

        <h1 className={styles.RecoveryTitle}>Password Recovery</h1>

        <p className={styles.RecoveryText}>
          Don't worry! We'll help you get back in.
        </p>

        <div className={styles.successBox}>
          <FaCheckCircle className={styles.successIcon} />

          <div>
            <h2 className={styles.successTitle}>Reset link sent!</h2>

            <p className={styles.successText}>
              If an account exists for you@email.com, we've sent a password
              reset link. Check your inbox and spam folder.
            </p>
          </div>
        </div>

        <div className={styles.formBox}>
          <h3 className={styles.StepTwoTitle}>Step 2 of 2: Set New Password</h3>

          <div className={styles.inputGroup}>
            <label htmlFor="newPassword">New Password</label>

            <div className={styles.inputWrapper}>
              <InputBasic
                id="newPassword"
                name="newPassword"
                type={showNewPassword ? "text" : "password"}
                placeholder="Enter new password"
                value={newPassword}
                setValue={setNewPassword}
              />

              <ButtonIcon
                type="button"
                className={styles.eyeButton}
                onClick={() => setShowNewPassword((prev) => !prev)}
                ariaLabel="Toggle password visibility"
              >
                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
              </ButtonIcon>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword">Confirm New Password</label>

            <div className={styles.inputWrapper}>
              <InputBasic
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm new password"
                value={confirmPassword}
                setValue={setConfirmPassword}
              />

              <ButtonIcon
                type="button"
                className={styles.eyeButton}
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                ariaLabel="Toggle confirm password visibility"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </ButtonIcon>
            </div>
          </div>

          <ButtonBasic
            className={styles.ResetBtn}
            onClick={handleResetPassword}
          >
            Reset Password
          </ButtonBasic>
        </div>

        <p className={styles.RememberText}>
          Remember your password?{" "}
          <button
            type="button"
            className={styles.LoginLink}
            onClick={() => navigate("/login")}
          >
            Log In
          </button>
        </p>

        {/* Temporary button - remove later */}

        {/* <button className={styles.tempBtn} onClick={() => navigate("/home")}>
          Continue as a Hany
        </button> */}
      </div>
    </div>
  );
}
