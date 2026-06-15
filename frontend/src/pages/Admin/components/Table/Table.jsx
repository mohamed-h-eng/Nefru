import styles from "./Table.module.css";
import { IoIosSearch } from "react-icons/io";
import { IoFilterSharp } from "react-icons/io5";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import Icons from "../../../../assets/icons";
import Input from "../../../../shared/components/inputs/Inputs";
export default function Table({ title = "", headers = [], data = [] }) {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <p>{title}</p>
        </div>
        <div className={styles.body}>
          <div className={styles.tableHead}>
            {headers.map((item, index) => (
              <p className={styles.item} key={index}>
                {item}
              </p>
            ))}
          </div>
          <div className={styles.tableBody}>
            {data.map((item, index) => (
              <TableItem
                id={item.id}
                tour={item.tour}
                bookings={item.bookings}
                revenue={item.revenue}
                convRate={item.convRate}
                rating={item.rating}
                status={item.status}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
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
