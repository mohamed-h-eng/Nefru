import { useState } from 'react'
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineTune } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";

import styles from './Cards.module.css'

import image from '../../../assets/images/traveler.jpg'

function Card({placeholder, options, setValue}) {
    return (
    <>
    <div className={styles.container}>
    {options.map((item,index) => {
      return (
        <div key={index} className={styles.card}>
          <div className={styles.image}>
            <img src={item.image} />
          </div>
          <div className={styles.overlay}>
              {item.tag ? (<p className={styles.tag}>{item.tag}</p>) : <></>}
              <p>{item.location}</p>
              <p>{item.type}</p>
          </div>
        </div>
      );
    })}
    </div>
    </>
  )
}

function CardStrip({options = []}) {
    return (
    <>
      <div className={styles.container_strip}>
        {options.map((item, index) => (
          <div key={index} className={styles.strip}>
            <div className={styles.strip_image}>
              <img src={item.image || image} alt={item.title} />
            </div>
            <div className={styles.strip_label}>
              <p>{item.title}</p>
              <p>{item.location}</p>
              <p><span>${item.price}</span> / person</p>
            </div>
            <div className={styles.strip_save}>
              <FaRegHeart />
            </div>
          </div>
        ))}
        {options.length === 0 && <p style={{textAlign: 'center', width: '100%', padding: '20px'}}>No trips found</p>}
      </div>
    </>
  )  
}

export {Card, CardStrip}
