import styles from './Sidebar.module.css';
import { GrOverview } from "react-icons/gr";
import { MdEvent } from "react-icons/md";
import { LuTicket } from "react-icons/lu";
import { FaLocationDot } from "react-icons/fa6";
import { IoPeopleSharp } from "react-icons/io5";
import { IoSettings } from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";
import { CiLocationOn } from "react-icons/ci";
import { LuUsers } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";

import {Button} from '../../../../shared/components/Button/Button'
import {useNavigate} from 'react-router-dom'
import {useState} from 'react'
export default function SideBar() {
  const Pages = [
    {label:"Overview",icon:""},
    {label:"Accounts",icon:""},
    {label:"CMS",icon:""},
    {label:"Analytics",icon:""},
    {label:"Booking",icon:""},
  ]
  const [active, setActive] = useState("Overview")
  const navigate = useNavigate()
  function handleSelect(page=""){
    navigate(page.toLowerCase())
    setActive(page)
  }
  return (
    <div className={styles.sidebar}>
      {Pages.map((page,index)=>(
        <Button 
          type={active === page.label? "primary":"normal"} 
          key={index} 
          onClick={()=>handleSelect(page.label)}>
          <LuLayoutDashboard />
          {page.label}
        </Button>
      ))}
    </div>
  );
}