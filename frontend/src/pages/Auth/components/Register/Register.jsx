import { useRef, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import Logo_Light from "../../../../assets/images/Logo_Light.png";
import Icons from "../../../../assets/icons";
import { Input } from "../../../../shared/components/inputs/inputs";
import { Button } from "../../../../shared/components/Button/Button";
import Footer from "../../../../shared/Footer/Footer";
import styles from "./Register.module.css";

export default function Register() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState({});
  const [agreed, setAgreed] = useState(false);
  const fileInputRef = useRef(null);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const roleFromUrl = searchParams.get("role")?.toLowerCase();
  const initialRole =
    roleFromUrl === "guide" || roleFromUrl === "tourist"
      ? roleFromUrl
      : "tourist";

  const [role, setRole] = useState(initialRole);
  const roleLabel = role === "guide" ? "Guide" : "Traveler";

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) setUploadedFile(file);
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) setUploadedFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    // Later, when backend file upload is ready, enable this validation again.
    // if (!uploadedFile) {
    //   newErrors.document = "Please upload your ID or Passport.";
    // }

    if (!agreed) {
      newErrors.terms = "You must agree to the terms to continue.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    // Later this will call POST /api/auth/register with the selected role.
    if (role === "guide") {
      navigate("/auth/application-received");
    } else {
      navigate("/auth/login");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.authLayout}>
        <section className={styles.hero} aria-label="Nefru Egypt travel hero">
          <div className={styles.heroOverlay} />
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Your Journey Begins in Egypt</h1>
            <div className={styles.heroLine} />
            <p className={styles.heroText}>
              Create your Nefru account to unlock exclusive experiences,
              personalized journeys, and the timeless wonders of Egypt.
            </p>
          </div>
        </section>

        <main className={styles.registerSide}>
          <div className={styles.registerCard}>
            <div className={styles.StepTwoContainer}>
              <div className={styles.content}>
                <img className={styles.logo} src={Logo_Light} alt="Nefru logo" />
                <p className={styles.subtitle}>
                  Signing up as a <strong>{roleLabel}</strong>
                </p>
              </div>
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.roleToggle} aria-label="Choose account type">
                <button
                  type="button"
                  className={`${styles.roleOption} ${
                    role === "tourist" ? styles.roleOptionActive : ""
                  }`}
                  onClick={() => setRole("tourist")}
                  aria-pressed={role === "tourist"}
                >
                  <Icons.User />
                  <span>Traveler</span>
                </button>

                <button
                  type="button"
                  className={`${styles.roleOption} ${
                    role === "guide" ? styles.roleOptionActive : ""
                  }`}
                  onClick={() => setRole("guide")}
                  aria-pressed={role === "guide"}
                >
                  <Icons.User />
                  <span>Guide</span>
                </button>
              </div>

              <div className={styles.field}>
                <Input
                  id="fullName"
                  title="Full name"
                  placeholder="Enter your full name"
                  icon={<Icons.User />}
                />
              </div>

              <div className={styles.field}>
                <Input
                  id="email"
                  title="Email"
                  placeholder="you@email.com"
                  icon={<Icons.Email />}
                />
              </div>

              <div className={styles.field}>
                <Input
                  id="password"
                  title="Password"
                  type="password"
                  placeholder="Create a password"
                  icon={<Icons.Lock />}
                  showToggle
                />
              </div>

              <div className={styles.field}>
                <Input
                  id="confirmPassword"
                  title="Confirm password"
                  type="password"
                  placeholder="Confirm your password"
                  icon={<Icons.Lock />}
                  showToggle
                />
              </div>

              <label className={styles.label}>Document Verification</label>
              <div className={styles.field}>
                <div
                  className={`${styles.uploadZone} ${
                    isDragging ? styles.uploadZoneDragging : ""
                  } ${errors.document ? styles.uploadZoneError : ""}`}
                  role="button"
                  tabIndex={0}
                  aria-label="Upload ID or Passport"
                  onClick={() => fileInputRef.current?.click()}
                  onKeyDown={(e) =>
                    e.key === "Enter" && fileInputRef.current?.click()
                  }
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,.pdf"
                    className={styles.hiddenInput}
                    onChange={handleFileInput}
                    aria-hidden="true"
                  />
                  <div className={styles.passportIcon}>
                    <Icons.Passport />
                  </div>
                  <div className={styles.uploadText}>
                    <span className={styles.uploadTitle}>
                      {uploadedFile ? uploadedFile.name : "Upload ID or Passport"}
                    </span>
                    <span className={styles.uploadSub}>
                      {uploadedFile ? "Click to replace" : "Drag & drop or browse"}
                    </span>
                  </div>
                </div>

                {errors.document && (
                  <span className={styles.errorMsg}>{errors.document}</span>
                )}
              </div>

              <div className={styles.termsRow}>
                <input
                  type="checkbox"
                  id="agreeTerms"
                  className={styles.checkbox}
                  checked={agreed}
                  onChange={() => setAgreed((prev) => !prev)}
                />
                <label htmlFor="agreeTerms" className={styles.termsText}>
                  I agree to the{" "}
                  <a href="/terms" className={styles.termsLink}>
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="/privacy" className={styles.termsLink}>
                    Privacy Policy
                  </a>
                  .
                </label>
              </div>

              {errors.terms && (
                <span className={styles.errorMsg}>{errors.terms}</span>
              )}

              <div>
                <Button type="primary" onClick={handleSubmit}>
                  Create Account
                </Button>

                <p className={styles.loginRow}>
                  Already have an account?{" "}
                  <span
                    className={styles.loginLink}
                    onClick={() => navigate("/auth/login")}
                  >
                    Log In
                  </span>
                </p>
              </div>
            </form>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
