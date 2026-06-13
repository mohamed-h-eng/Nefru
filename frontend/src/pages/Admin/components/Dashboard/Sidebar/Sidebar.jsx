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

import {Button} from '../../../../../shared/components/Button/Button'

export default function SideBar() {
  const Pages = [
    {label:"Overview",icon:""},
    {label:"Accounts",icon:""},
    {label:"CMS",icon:""},
    {label:"Analytics",icon:""},
    {label:"Booking",icon:""},
  ]
  return (
    <div className={styles.sidebar}>
      {Pages.map((page)=>(
        <Button type="normal">
          <LuLayoutDashboard />
          {page.label}
        </Button>
      ))}
    </div>
  );
}