import styles from "./Button.module.css";
function Button({ type="normal", children, className = "", onClick, icon = "", htmlType = "button",
  disabled = false,}) {
  return (
    <>
      <button className={`${className} ${styles.button} ${styles[type]}`} onClick={onClick} type={htmlType} disabled={disabled}>
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