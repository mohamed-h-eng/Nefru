import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "../../../../shared/components/Button/Button";
import { Input } from "../../../../shared/components/inputs/inputs";
import Footer from "../../../../shared/Footer/Footer";
import Icons from "../../../../assets/icons";
import LogoLight from "../../../../assets/images/Logo_Light.png";
import styles from "./Login.module.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    // Auth API integration will be connected later.
    navigate("/user/home");
  };

  return (
    <main className={styles.container}>
      <div className={styles.authLayout}>
        <section className={styles.hero} aria-label="Nefru trusted travel access">
          <div className={styles.heroOverlay} />
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Continue your Egyptian journey</h1>
            <div className={styles.heroLine} />
            <p className={styles.heroText}>
              Sign in to discover curated trips, manage your bookings, and explore
              Egypt with verified local guides.
            </p>
          </div>
        </section>

        <section className={styles.formSide}>
          <div className={styles.authCard}>
            <div className={styles.headerBlock}>
              <img className={styles.logo} src={LogoLight} alt="Nefru logo" />
              <h1 className={styles.title}>Log in</h1>
              <p className={styles.subtitle}>
                Welcome back! Please log in to continue your journey.
              </p>
            </div>

            <form className={styles.form} onSubmit={handleLogin}>
              <div className={styles.field}>
                <Input
                  type="email"
                  id="email"
                  title="Email Address"
                  placeholder="you@email.com"
                  icon={<Icons.Email />}
                  value={email}
                  setValue={setEmail}
                />
              </div>

              <div className={styles.field}>
                <Input
                  type="password"
                  id="password"
                  title="Password"
                  placeholder="Enter your password"
                  icon={<Icons.Lock />}
                  value={password}
                  setValue={setPassword}
                />
              </div>

              <div className={styles.options}>
                <label className={styles.rememberOption} htmlFor="remember">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={() => setRememberMe((prev) => !prev)}
                  />
                  <span>Remember me</span>
                </label>

                <Link to="/auth/forget-password" className={styles.forgot}>
                  Forgot password?
                </Link>
              </div>

              {error && <p className={styles.errorMsg}>{error}</p>}

              <Button type="primary" onClick={handleLogin}>
                Log in
              </Button>
            </form>

            <div className={styles.divider}>
              <span>or</span>
            </div>

            <Button
              icon={<Icons.Guest />}
              onClick={() => navigate("/user/home")}
              type="primary"
            >
              Continue as Guest
            </Button>

            <p className={styles.dont}>
              Don't have an account? <Link to="/auth/register">Register</Link>
            </p>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}

export default Login;
