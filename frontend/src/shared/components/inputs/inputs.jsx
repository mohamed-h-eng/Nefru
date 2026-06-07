import { useState, useId } from 'react'
import style from './Inputs.module.css'
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineTune } from "react-icons/md";
import Icons from '../../../assets/icons'
function Input({ title, placeholder, icon, type, value, setValue }) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const inputId = useId();

  function handelShowPassword(){
    if(showPassword){
      setShowPassword(false)
    }else{
      setShowPassword(true)
    }
    console.log(showPassword)
  }
  return (
    <div className={style.input_icon_container}>
      <label htmlFor={inputId} style={{cursor:'pointer'}}>{title}</label>
      <div
        className={`${style.input_container} ${
          isFocused ? style.focused : ""
        }`}
      >
        <div
          className={`${style.icon} ${
            isFocused ? style.focused : ""
          }`}
        >
        {icon}
        </div>
        <input
          id={inputId}
          name={inputId}
          placeholder={placeholder}
          value={value}
          type={type ==="password"? (showPassword? 'text':'password'):'text'}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {type==="password"?
        <div className={style.showPassword} onClick={handelShowPassword}>
          {showPassword? <Icons.EyeSlash/>:<Icons.Eye/>}
        </div>
        :<></>
      }
      </div>
    </div>
  );
}

// function InputIconFilter({ placeholder, value, setValue, icon }) {
//   return (
//     <div className="container">
//         <div className="input-container">
//         <IoSearchOutline className="icon" style={{fontSize: "27px" }}/>
//         <input
//             placeholder={placeholder}
//             value={value}
//             onChange={(e) => setValue(e.target.value)}
//         />
//         </div>
//         <div className="filter">
//             <MdOutlineTune className="filter-btn" style={{fontSize: "27px" }}/>
//         </div>
//     </div>
//   )
// }

export {Input}
