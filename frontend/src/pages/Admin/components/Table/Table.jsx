import styles from "./Table.module.css";
import { IoIosSearch } from "react-icons/io";
import { IoFilterSharp } from "react-icons/io5";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import Icons from '../../../../assets/icons'
import Input from '../../../../shared/components/inputs/Inputs'
import {Button }from '../../../../shared/components/Button/Button'
import {useState} from 'react'

export default function Table({title="", headers=[], data=[]}){
    const [active,setActive] = useState()
    return(
        <>
            <div className={styles.container}>
                {
                    title? <div className={styles.header}>
                                <p>{title}</p>
                            </div> :<></>
                }
                <div className={styles.body}>
                    <div className={styles.tableHead}
                        style={{borderRadius:title?"0px":"10px"}}>
                        {headers.map((item,index)=>(
                            <p className={styles.item} key={index}>{item}</p>
                        ))}
                    </div>
                    <div className={styles.tableBody}>
                        {data.map((item,index)=>(
                            <TableItem 
                                id={item.id}
                                tour={item.tour}
                                bookings={item.bookings}
                                revenue={item.revenue}
                                convRate={item.convRate}
                                rating={item.rating}
                                status={item.status} key={index} />
                        ))}
                    </div>
                    <div className={styles.footer}>
                        <div className="t">
                            <p>total records: 202</p>
                        </div>
                        <div className={styles.page}>
                            <Button className={styles.pageBtn} ><Icons.chevronLeft/></Button>
                            <Button className={styles.pageBtn} type="secondary">1</Button>
                            <Button className={styles.pageBtn} type="normal">2</Button>
                            <Button className={styles.pageBtn} type="normal">3</Button>
                            <Button className={styles.pageBtn} ><Icons.chevronRight/></Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function TableItem({ id, tour, bookings, revenue, convRate, rating, status }) {
  const states = [{ Active: "var(--color" }];
  return (
    <>
      <div className={styles.itemContainer}>
        <p className={`${styles.item}`}>{id}</p>
        <p className={styles.item}>{tour}</p>
        <p className={styles.item}>{bookings}</p>
        <p className={styles.item}>${revenue}</p>
        <p className={styles.item}>{convRate}%</p>
        <div className={`${styles.item} ${styles.rate}`}>
          <p>
            <Icons.star />
          </p>{" "}
          <p>{rating}</p>
        </div>
        <div className={styles.item}>
          <p
            className={styles.status}
            style={{
              color: "var(--color-active)",
              backgroundColor: "var(--color-active-mute)",
            }}
          >
            {status}
          </p>
        </div>
      </div>
    </>
  );
}
