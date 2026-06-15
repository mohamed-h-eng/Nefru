import styles from "./Button.module.css";
function Button({ type="normal", children, className = "", onClick, icon = "", htmlType = "button" }) {
  return (
    <>
      {/* <button className={`${styles.button} ${styles[type]}`}>
        {icon}
        {children}
      </button> */}

      <button
        type={htmlType}
        className={`${styles.button} ${styles[type]} ${className}`}
        onClick={onClick}
      >
        {icon}
        {children}
      </button>
    </>
  );
}

{
  /**** 
function ButtonIcon({ children, className, onClick }) {
  return (
    <>
      <div className={`${styles.btn_icon} ${className}`} onClick={onClick}>
        {children}
      </div>
    </>
  );
}
  ******/
}

// export { Button, ButtonIcon };
export { Button };