import { useState } from 'react'
import styles from './Button.module.css'

function Button({type, children , className, onClick}) {
    return (
    <>
      <button className={`${className} ${styles[type]}`} onClick={onClick}>{children}</button>
    </>
  )
}

function ButtonIcon({children , className, onClick}) {
    return (
    <>
      <div className={`${styles.btn_icon} ${className}`} onClick={onClick}>{children}</div>
    </>
  )
}
export {Button ,ButtonIcon}
