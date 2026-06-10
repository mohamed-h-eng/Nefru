import styles from "./Status.module.css";
import { FaRegCalendarCheck } from "react-icons/fa";
import { LuTicket } from "react-icons/lu";
import { BsCashStack } from "react-icons/bs";
import { RiCalendarScheduleLine } from "react-icons/ri";


export default function Status() {
  return (
    <>
      <div className={styles.container}>
          <Card icon={<FaRegCalendarCheck/>} label="TOTAL EVENTS" counter="12" tag="+2 new"/>
          <Card icon={<LuTicket />} label="TOTAL TICKETS SOLD" counter="1,240" tag="+15%"/>
          <Card icon={<BsCashStack />} label="REVENUE" counter="$4,200" tag="Target Reached"/>
          <Card icon={<RiCalendarScheduleLine />} label="PENDING APPROVALS" counter="3" tag="Urgent"/>
      </div>
    </>
  );
}

function Card({icon, label, counter, tag}){
  return(<>
    <div className={styles.card}>
          <div className={styles.header}>
            <div className={styles.icon}>
              {icon}
            </div>
            <span className={`${styles.tag} ${tag ==="Urgent"? "urgent":""}`}>{tag}</span>
          </div>
          <p className={styles.label}>{label}</p>
          <p className={styles.counter}>{counter}</p>
    </div>
  </>)
}