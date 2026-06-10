import { useState } from 'react'
import './style.css'
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineTune } from "react-icons/md";

function InputBasic({placeholder, value, setValue}) {
    return (
    <>
      <input placeholder={placeholder} value={value} onChange={(e) => setValue(e.target.value)}/>
    </>
  )
}

function InputIcon({ placeholder, value, setValue, onChange, icon }) {
  const handleChange = (e) => {
    if (setValue) setValue(e.target.value);
    if (onChange) onChange(e);
  };

  return (
    <div className="input-container">
      {icon}
      <input
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
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
