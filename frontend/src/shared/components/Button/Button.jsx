import styles from "./Button.module.css";

function Button({
  type = "primary",
  children,
  className,
  onClick,
  icon = "",
  htmlType = "button",
}) {
  return (
    <>
      {/* <button className={`${className} ${styles[type]}`} onClick={onClick}>
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
export { Button };
