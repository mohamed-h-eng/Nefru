import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "../../../../shared/components/Button/Button";
import { Input } from "../../../../shared/components/inputs/inputs";
import Footer from "../../../../shared/Footer/Footer";
import Icons from "../../../../assets/icons";
import LogoLight from "../../../../assets/images/Logo_Light.png";
import styles from "./Forgetpassword.module.css";

export default function Forgetpassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSendReset = (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    // Forgot password API integration will be connected later.
    navigate("/auth/reset-password");
  };

  return (
    <main className={styles.container}>
      <div className={styles.authLayout}>
        <section className={styles.hero} aria-label="Password recovery help">
          <div className={styles.heroOverlay} />
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Get back to your journey safely</h1>
            <div className={styles.heroLine} />
            <p className={styles.heroText}>
              Enter your email and we’ll help you reset access to your Nefru
              account without losing your upcoming travel plans.
            </p>
          </div>
        </section>

        <section className={styles.formSide}>
          <div className={styles.authCard}>
            <div className={styles.headerBlock}>
              <img src={LogoLight} alt="Nefru logo" className={styles.logo} />
              <h1 className={styles.title}>Password Recovery</h1>
              <p className={styles.subtitle}>
                Don’t worry! We’ll send reset instructions to your email.
              </p>
            </div>

            <form className={styles.form} onSubmit={handleSendReset}>
              <div className={styles.infoBox}>
                <Icons.EmailOutline />
                <p>
                  Use the same email you used to create your Traveler or Guide account.
                </p>
              </div>

              <div className={styles.field}>
                <Input
                  id="email"
                  icon={<Icons.EmailOutline />}
                  placeholder="you@email.com"
                  value={email}
                  setValue={setEmail}
                  type="email"
                  title="Email address"
                />
              </div>

              {error && <p className={styles.errorMsg}>{error}</p>}

              <Button type="primary" onClick={handleSendReset}>
                Send Reset Link
              </Button>
            </form>

            <p className={styles.loginRow}>
              Remember your password?{" "}
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
