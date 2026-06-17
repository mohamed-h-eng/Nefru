// import { FaCheckCircle, FaEye, FaEyeSlash } from "react-icons/fa";
import Icons from "../../../../assets/icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Logo_Light from "../../../../assets/images/Logo_Light.png";
import styles from "./ResetPassword.module.css";
// import logo from "../../../assets/img/nefru-logo.png";
import { Input } from "../../../../shared/components/inputs/inputs";
import { Button } from "../../../../shared/components/Button/Button";

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

    navigate("/auth/login");
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
          <Icons.CheckCircle className={styles.successIcon} />
          <div>
            <h2 className={styles.successTitle}>Reset link sent!</h2>
            <p className={styles.successText}>Check your email</p>
          </div>
        </div>

        <div className={styles.formBox}>
          <Input
            id="newPassword"
            title="New password"
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            setValue={setNewPassword}
          />
          <Input
            id="confirmPassword"
            title="Confirm password"
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            setValue={setConfirmPassword}
          />

          <Button type="primary" onClick={handleResetPassword}>
            Reset Password
          </Button>
        </div>
        <p className={styles.RememberText}>
          Already have an account?{" "}
          <span
            className={styles.loginLink}
            onClick={() => navigate("/auth/login")}
          >
            Log In
          </span>
        </p>
      </div>
    </div>
  );
}
