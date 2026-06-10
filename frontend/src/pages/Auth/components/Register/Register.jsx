import { useRef, useState } from "react";
import Logo_Light from "../../../../assets/images/Logo_Light.png";
import { Input } from "../../../../shared/components/Inputs/Inputs";
 import styles from "./Register.module.css";
import { Button } from '../../../../shared/components/Button/Button'
import { useNavigate} from 'react-router-dom'
import Icons from '../../../../assets/icons'

export default function Register({ typeUser }) {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const [errors, setErrors] = useState({});
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();
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
            <p>
              Signing up as a <strong>{typeUser}</strong>
            </p>
          </div>
        </div>

        <form>
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
              title="password"
              placeholder="Create a password"
              icon={<Icons.Lock />}
              showToggle
            />
          </div>
          <div className={styles.field}>
            <Input
              id="confirmPassword"
              title="Confirm password"
              placeholder="Confirm your password"
              icon={<Icons.Lock />}
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

          {/* Terms */}
          <div className={styles.termsRow}>
            <button
              type="button"
              role="checkbox"
              aria-label="Agree to terms"
              aria-checked={agreed}
              onClick={() => setAgreed((prev) => !prev)}
              className={`${styles.checkbox} ${agreed ? styles.checkboxChecked : ""}`}
            />
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
            <Button type="primary" onClick={() => navigate("/auth/application-received")}>
              Create Account
            </Button>

            <p className={styles.loginRow}>
              Already have an account?{" "}
              <span className={styles.loginLink} onClick={() => navigate("/auth/login")}>
                Log In
              </span>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
