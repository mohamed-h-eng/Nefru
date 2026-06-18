import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Input } from "../../../../shared/components/inputs/inputs";
import { Button } from "../../../../shared/components/Button/Button";
import Footer from "../../../../shared/Footer/Footer";
import Icons from "../../../../assets/icons";
import LogoLight from "../../../../assets/images/Logo_Light.png";
import styles from "./ResetPassword.module.css";

export default function ResetPassword() {
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleResetPassword = (e) => {
    e.preventDefault();
    setError("");

    if (!newPassword || !confirmPassword) {
      setError("Please fill in both password fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords don't match. Please try again.");
      return;
    }

    // Reset password API integration will be connected later.
    navigate("/auth/login");
  };

  return (
    <main className={styles.container}>
      <div className={styles.authLayout}>
        <section className={styles.hero} aria-label="Create new password">
          <div className={styles.heroOverlay} />
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Set a fresh key for your account</h1>
            <div className={styles.heroLine} />
            <p className={styles.heroText}>
              Choose a strong password so your Nefru account stays safe while you
              plan and manage your travel experiences.
            </p>
          </div>
        </section>

        <section className={styles.formSide}>
          <div className={styles.authCard}>
            <div className={styles.headerBlock}>
              <img src={LogoLight} alt="Nefru logo" className={styles.logo} />
              <h1 className={styles.title}>Reset Password</h1>
              <p className={styles.subtitle}>
                Create a new password to get back into your account.
              </p>
            </div>

            <form className={styles.form} onSubmit={handleResetPassword}>
              <div className={styles.successBox}>
                <Icons.CheckCircle className={styles.successIcon} />
                <div>
                  <h2 className={styles.successTitle}>Reset link verified</h2>
                  <p className={styles.successText}>You can now create a new password.</p>
                </div>
              </div>

              <div className={styles.field}>
                <Input
                  id="newPassword"
                  title="New password"
                  type="password"
                  placeholder="Enter new password"
                  icon={<Icons.Lock />}
                  value={newPassword}
                  setValue={setNewPassword}
                />
              </div>

              <div className={styles.field}>
                <Input
                  id="confirmPassword"
                  title="Confirm password"
                  type="password"
                  placeholder="Confirm new password"
                  icon={<Icons.Lock />}
                  value={confirmPassword}
                  setValue={setConfirmPassword}
                />
              </div>

              {error && <p className={styles.errorMsg}>{error}</p>}

              <Button type="primary" onClick={handleResetPassword}>
                Reset Password
              </Button>
            </form>

            <p className={styles.loginRow}>
              Already have an account?{" "}
              <button type="button" onClick={() => navigate("/auth/login")}>
                Log In
              </button>
            </p>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
