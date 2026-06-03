import { useState } from 'react'
import style from './Inputs.module.css'
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineTune } from "react-icons/md";

function InputBasic({placeholder, value, setValue}) {
    return (
    <>
      <input placeholder={placeholder} value={value} onChange={(e) => setValue(e.target.value)}/>
    </>
  )
}

function InputIcon({ placeholder, value, setValue, icon }) {
  return (
    <div className={style.input_container}>
      {icon}
      <input
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  )
}

function InputIconFilter({ placeholder, value, setValue, icon }) {
  return (
    <div className="container">
        <div className="input-container">
        <IoSearchOutline className="icon" style={{fontSize: "27px" }}/>
        <input
            placeholder={placeholder}
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
        </div>
        <div className="filter">
            <MdOutlineTune className="filter-btn" style={{fontSize: "27px" }}/>
        </div>
    </div>
  )
}

export {InputBasic, InputIcon, InputIconFilter}
