import { useRef, useState } from "react";
import Logo_Light from "../../../../assets/images/Logo_Light.png";
import { InputIcon } from "../../../../shared/components/inputs/inputs";
// import { CheckSVG, PassportSVG } from "../../../../utils/Icon";
import styles from "./Register.module.css";
import { CiUser, CiMail, CiLock } from "react-icons/ci";

export default function Register() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const [errors, setErrors] = useState({});
  const [agreed, setAgreed] = useState(false);

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

  return (
    <>
      <div className={styles.container}>
        <div className={styles.StepTwoContainer}>
          <div className={styles.content}>
            <img className={styles.logo} src={Logo_Light} alt="logo" />
            <h1>Create Account</h1>
            <p>
              Signing up as a <strong>Traveler</strong>
            </p>
          </div>
        </div>

        <form>
          <label htmlFor="fullname">Full Name</label>
          <div className={styles.field}>
            <InputIcon
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Enter your full name"
              icon={<CiUser />}
            />
          </div>
          <label htmlFor="email" className={styles.label}>
            Email Address
          </label>
          <div className={styles.field}>
            <InputIcon
              id="email"
              name="email"
              type="email"
              placeholder="you@email.com"
              icon={<CiMail />}
            />
          </div>

          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <div className={styles.field}>
            <InputIcon
              id="password"
              name="password"
              type="password"
              placeholder="Create a password"
              icon={<CiLock />}
              showToggle
            />
          </div>

          <label htmlFor="confirmPassword" className={styles.label}>
            Confirm Password
          </label>
          <div className={styles.field}>
            <InputIcon
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              icon={<CiLock />}
              showToggle
            />
          </div>

          {/* Document Verification */}
          <label className={styles.label}>Document Verification</label>
          <div className={styles.field}>
            <div
              className={`${styles.uploadZone} ${isDragging ? styles.uploadZoneDragging : ""} ${errors.document ? styles.uploadZoneError : ""}`}
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
                {/* <PassportSVG /> */}
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

          {/* Terms */}
          <div className={styles.termsRow}>
            <button
              type="text"
              className={styles.checkbox}
              role="checkbox"
              aria-label="Agree to terms"
              aria-checked={agreed}
              onClick={() => setAgreed((prev) => !prev)}
              className={`${styles.checkbox} ${agreed ? styles.checkboxChecked : ""}`}
            >
              {agreed && <CheckSVG />}
            </button>
            <p className={styles.termsText}>
              I agree to the{" "}
              <a href="/terms" className={styles.termsLink}>
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy" className={styles.termsLink}>
                Privacy Policy
              </a>
              .
            </p>
          </div>
          {errors.terms && (
            <span className={styles.errorMsg}>{errors.terms}</span>
          )}

          {/* Submit  */}
          <div>
            <button type="submit" className={styles.submitBtn}>
              Create Account
            </button>

            <p className={styles.loginRow}>
              Already have an account?{" "}
              <a href="/login" className={styles.loginLink}>
                Log In
              </a>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
