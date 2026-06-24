import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "../../../../shared/components/Button/Button";
import { Input } from "../../../../shared/components/inputs/inputs";
import Footer from "../../../../shared/Footer/Footer";
import Icons from "../../../../assets/icons";
import LogoLight from "../../../../assets/images/Logo_Light.png";
import styles from "./Forgetpassword.module.css";

import { useFormik } from "formik";
import * as Yup from "yup";
import { apiRequest } from "../../../../services/api";


const FORGOT_PASSWORD_SCHEMA = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email address.")
    .required("Email is required."),
});

export default function Forgetpassword() {
  const navigate = useNavigate();

  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [resetToken, setResetToken] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
    },

    validationSchema: FORGOT_PASSWORD_SCHEMA,

    onSubmit: async (values, { setSubmitting }) => {
      setApiError("");
      setSuccessMessage("");
      setResetToken("");

      try {
        const response = await apiRequest("/auth/forgot-password", {
          method: "POST",
          body: JSON.stringify({
            email: values.email,
          }),
        });

        setSuccessMessage(
          response.message || "Password reset instructions have been sent.",
        );

        // in future here will be handled by email service / node mailer on backend,
        // and the user will receive the reset password link by email.
        // For development only, backend may return resetToken directly.
        if (response.resetToken) {
          setResetToken(response.resetToken);
        }
      } catch (error) {
        setApiError(error.message || "Failed to send reset instructions.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <main className={styles.container}>
      <div className={styles.authLayout}>
        <section className={styles.hero} aria-label="Password recovery help">
          <div className={styles.heroOverlay} />
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Get back to your journey safely
            </h1>
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
              <p className={`${styles.subtitle} fs-5`}>
                Don’t worry! We’ll send reset instructions to your email.
              </p>
            </div>

            <form className={styles.form} onSubmit={formik.handleSubmit}>
              <div className={styles.infoBox}>
                <Icons.EmailOutline />
                <p>
                  Use the same email you used to create your Traveler or Guide
                  account.
                </p>
              </div>

              <div className={styles.field}>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  title="Email"
                  placeholder="you@email.com"
                  icon={<Icons.Email />}
                  value={formik.values.email}
                  setValue={(value) => formik.setFieldValue("email", value)}
                  onBlur={() => formik.setFieldTouched("email", true)}
                />

                {formik.touched.email && formik.errors.email && (
                  <span className={styles.errorMsg}>{formik.errors.email}</span>
                )}
              </div>

              {apiError && <p className={styles.errorMsg}>{apiError}</p>}

              {successMessage && (
                <p className={styles.successMsg}>{successMessage}</p>
              )}

              <Button
                type="primary"
                htmlType="submit"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? "Sending..." : "Send Reset Link"}
              </Button>

              {resetToken && (
                <>
                  {/* remeber to delete in production */}
                  <Button
                    type="normal"
                    htmlType="button"
                    onClick={() =>
                      navigate(
                        `/auth/reset-password?token=${encodeURIComponent(
                          resetToken,
                        )}`,
                      )
                    }
                  >
                    Continue to Reset Password
                  </Button>
                </>
              )}
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
