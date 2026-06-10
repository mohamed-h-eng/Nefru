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
import {useState} from 'react'
import {Button} from '../../../../../shared/components/Button/Button'

export default function SideBar() {
  const Pages = [
    {label:"Overview",icon:"",to:"/admin"},
    {label:"Accounts",icon:"",to:"/admin/accounts"},
    {label:"CMS",icon:"",to:"/admin/cms"},
    {label:"Analytics",icon:"",to:"/admin/analytics"},
    {label:"Booking",icon:"",to:"/admin/booking"},
  ]
  const [CurrentPage,setPage]= useState("Overview")
  return (
    <div className={styles.sidebar}>
      {Pages.map((page,index)=>(
        <Button 
          type={CurrentPage === page.label?"primary":"normal"} 
          key={index}
          onClick={()=>setPage(page.label)}>
          <LuLayoutDashboard />
          {page.label}
        </Button>
      ))}
    </div>
  );
}