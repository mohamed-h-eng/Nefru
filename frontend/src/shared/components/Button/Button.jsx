import styles from "./Button.module.css";
function Button({ type="normal", children, className = "", onClick, icon = "", htmlType = "button" }) {
  return (
    <>
<<<<<<< HEAD
<<<<<<< HEAD
      <button className={`${styles.button} ${styles[type]}`} onClick={onClick}>
=======
      {/* <button className={`${styles.button} ${styles[type]}`}>
        {icon}
        {children}
      </button> */}

      <button
        type={htmlType}
        className={`${styles.button} ${styles[type]} ${className}`}
        onClick={onClick}
      >
>>>>>>> 058832be628216da0e1870cbbda67ea18c8ef6ed
=======
      <button className={`${styles.button} ${styles[type]}`}>
>>>>>>> parent of f09c4fb (update)
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