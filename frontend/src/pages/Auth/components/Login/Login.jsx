import { Button } from "../../../../shared/components/Button/Button";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import Icons from "../../../../assets/icons";
import Logo_Light from "../../../../assets/images/Logo_Light.png";
import { Input } from "../../../../shared/components/inputs/inputs";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.container}>
        <img className={styles.logo} src={Logo_Light} alt="Nefru logo" />
        <h1 className={styles.title}>Log in</h1>
        <p className={styles.subtitle}>
          Welcome back! Please log in to continue your journey.
        </p>

        <form className={styles.form}>
          <div className={styles.field}>
            <Input
              type="email"
              id="email"
              title="Email Address"
              placeholder="you@email.com"
              icon={<Icons.Email />}
            />
          </div>

          <div className={styles.field}>
            <Input
              type="password"
              id="password"
              title="Password"
              placeholder="Enter your password"
              icon={<Icons.Lock />}
            />
          </div>

          <div className={`row ${styles.options}`}>
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Remember me</label>
            <Link to="/auth/forget-password" className={styles.forgot}>
              Forgot password?
            </Link>
          </div>

          <Button children="Log in" onClick={() => navigate("/user/home")} type="primary" />
        </form>

        <div className={styles.divider}>
          <span>or</span>
        </div>

        <Button
          children="Continue as Guest"
          icon={<Icons.Guest />}
          onClick={() => navigate("/user/home")}
          type="primary"
        />

        <div className={styles.dont}>
          <span> Don't have an account? </span>{" "}
          <Link to="/auth/register">Register</Link>
        </div>
      </div>
    </>
  );
}

export default Login;
