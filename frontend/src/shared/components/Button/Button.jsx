import { useState } from 'react'
import styles from './Button.module.css'

function Button({children , className, onClick}) {
    return (
    <>
      <button className={className} onClick={onClick}>{children}</button>
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
