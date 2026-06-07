import { useRef, useState } from "react";
import Logo_Light from "../../../../assets/images/Logo_Light.png";
import { InputIcon } from "../../../../shared/components/Inputs/Inputs";
// import { CheckSVG, PassportSVG } from "../../../../utils/Icon";
import styles from "./Register.module.css";
// import { CiUser, CiMail, CiLock } from "react-icons/ci";
// import { GiPassport } from "react-icons/gi";
// import { IoMdCheckbox } from "react-icons/io";
import {Button} from "../../../../shared/components/Button/Button";
import Icons from "../../../../assets/icons";
import { useNavigate } from "react-router-dom";

export default function Register({ typeUser }) {
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

const navigate = useNavigate();
  return (
    <>
      <div className={styles.container}>
        <div className={styles.StepTwoContainer}>
          <div className={styles.content}>
            <img className={styles.logo} src={Logo_Light} alt="logo" />
            <h1>Create Account</h1>
            <p>
              Signing up as a <strong>{typeUser}</strong>
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
              icon={<Icons.User />}
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
              icon={<Icons.Email />}
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
              icon={<Icons.Lock />}
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


          {/* Submit  */}
          <div>
            <Button type="submit" className={styles.submitBtn} onClick={() => navigate("/auth/application-received")}>
              Create Account
            </Button>

            <p className={styles.loginRow}>
              Already have an account?{" "}
              <a href="/auth/login" className={styles.loginLink}>
                Log In
              </a>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
