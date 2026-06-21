import styles from "./Table.module.css";
import { IoIosSearch } from "react-icons/io";
import { IoFilterSharp } from "react-icons/io5";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import Icons from '../../../../assets/icons'
import Input from '../../../../shared/components/inputs/Inputs'
import {Button }from '../../../../shared/components/Button/Button'
import {useState} from 'react'
import {status, roles} from '../../../../assets/variables'

export default function Table({title="", headers=[], data="", item=""}){
    const Item = item;
    return(
        <>
        <div className={styles.container}>
          <table className={styles.table}>
            <thead className={styles.tableHead}>
              <tr>
                {headers.map((item,index)=>(
                  <th className={styles.tableHeadItem} key={index}>{item}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item,index)=>(
                <Item key={index} data={item} style={{cursor:"pointer"}} />
              ))}
            </tbody>
          </table>
        </div>
        </>
    )
}

export function TourItem({ data }) {
  return (
    <tr className={styles.item} onClick={()=>console.log("hgere")}>

        <td>{data.id}</td>
        <td >{data.tour}</td>
        <td >{data.bookings}</td>
        <td >${data.revenue}</td>
        <td >{data.convRate}%</td>
        <td>
          <div className={styles.rate}>
            <Icons.star />
          {" "}{data.rating}</div>
        </td>
        <td >
          <div className={styles.status}
            style={{
              backgroundColor: status[data.status].back,
              color:status[data.status].text,
              border:`1px solid ${status[data.status].text}`
            }}
          >
            {data.status}
          </div>
        </td>
    </tr>
  );
}

export function AccountItem({ data }) {
  return (
    <tr className={styles.item}>
        <td ><div className={styles.avatar}>
            <Icons.User/>
            {data.name}
            </div></td>
        <td >{data.email}</td>
        <td >
          <div className={styles.role}
          style={{
              backgroundColor: roles[data.role].back,
              color:roles[data.role].text,
              border:`1px solid ${roles[data.role].text}`
            }}
            >{data.role}
            </div>
        </td>
        <td >
          <div className={styles.status}
            style={{
              backgroundColor: status[data.status].back,
              color:status[data.status].text,
              border:`1px solid ${status[data.status].text}`
            }}
          >
            {data.status}
          </div>
        </td>
        <td>{data.joined}</td>
    </tr>
  );
}
