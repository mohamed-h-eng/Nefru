import React from 'react'
import { Button } from '../../../shared/components/Button/Button'
import TourCard from './components/TourCard'
import styles from './ToursManagement.module.css'
import image1 from '../../../assets/images/egypt.png'

function ToursManagement() {
 const tours = [
    {
      id: 1,
      image: image1,
      title: "Exclusive Sunrise at the Great Pyramids",
      duration: "4 Hours",
      maxPeople: 6,
      price: 120,
      status: "Active"
    },
    {
      id: 2,
      image: image1,
      title: "Luxor Temple Tour",
      duration: "3 Hours",
      maxPeople: 10,
      price: 80,
      status: "Draft"
    }
  ];

  return (
<>
 <nav className={styles.navbartours}>
     <h6>Explore</h6>
     <h4>Discover Egypt</h4>
 </nav>

<div className={styles.header}>
 
 <h1>My Tours</h1>

<div className="description">
<p>Manage your curated experiences and
track their performance.</p>
</div>

<button className={styles.createTourButton}
onClick={()=>console.log("create new tour")}>
  <span className={styles.plus}>+</span>
Create New Tour
</button>

</div>

<div className='insights'>
{/*
<p>{`all(${tours.all}) active(${tours.active}) Reviewing(${tours.all}) Draft(${tours.all})  `}</p>
*/}

</div>

 <div className="toursContainer">
        {tours.map((tour) => (
          <TourCard
            key={tour.id}
            image={tour.image}
            title={tour.title}
            duration={tour.duration}
            maxPeople={tour.maxPeople}
            price={tour.price}
            status={tour.status}
            actionText="Manage"
            onAction={() => console.log(tour.id)}
          />
        ))}
      </div>
</>
  )
}

export default ToursManagement