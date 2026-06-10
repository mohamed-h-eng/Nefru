import { useState } from "react";
import styles from "./Button.module.css";

function Button({ type="", children, className, onClick, icon = "" }) {
  return (
    <>
      <button className={`${className} ${styles[type]}`} onClick={onClick}>
        {icon}
        {children}
      </button>
    </>
  );
}
export { Button };
