import { Button } from "../../../../shared/components/Button/Button";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import Icons from "../../../../assets/icons";
import Logo_Light from "../../../../assets/images/Logo_Light.png";
import { Input } from "../../../../shared/components/Inputs/Inputs";
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.container}>
        <img className={styles.logo} src={Logo_Light} alt="logo" />
        <h1>Log in</h1>
        <pre>Welcome back! Please log in to continue your journey.</pre>
        <form className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="email">Email Address</label>
            <Input type="email" id="email" />
          </div>
          <div className={styles.field}>
            <label htmlFor="password">Password</label>
            <Input type="password" id="password" />
          </div>
          <div className={`row  ${styles.options}`}>
            {/* checkbox for remember me */}
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Remember me</label>
            <Link to="/auth/forget-password" className={styles.forgot}>
              Forgot password?
            </Link>
          </div>
          <Button children="Log in" onClick={() => {}} type="primary" />
        </form>
        <div className={styles.divider}>
          <span>or</span>
        </div>
        {/* <Link to="/user/home">Home</Link> */}
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
