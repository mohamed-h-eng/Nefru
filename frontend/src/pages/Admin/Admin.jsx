import SideBar from './components/Dashboard/Sidebar/Sidebar'
import styles from './Admin.module.css'
import Status from './components/Dashboard/Status/Status'
import Events from './components/Dashboard/Events/Events'
import Navbar from './components/Dashboard/Navbar/Navbar'

// import Form from './components/Dashboard/Form/Form'
import {Link} from 'react-router-dom'
import { IoEyeOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";

export default function Admin() {
  return (
    <div className={styles.dashboard}>
      <div className={styles.sidebar}>
        <SideBar />
      </div>
      <div className={styles.body}>
        <div className={styles.navbar}>
          <Navbar/>
        </div>
        {/* <Status/> */}
        <div className={styles.addEvents}>
          <div className={styles.events}>
            {/* <Events/> */}
          </div>
          <div className={styles.form}>
            {/* <Form/> */}
          </div>
        </div>
      </div>
    </div>
  )
}
