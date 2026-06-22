import React from "react";
import styles from "./TourCard.module.css";

import { LuClock3, LuChevronRight } from "react-icons/lu";
import { PiMoney } from "react-icons/pi";

const TourCard = ({ tour }) => {
    if (!tour) return null;

    // debugging
    // console.log("TOUR CARD RENDERED");
    // console.log(tour);

    return (
        <div className={styles.card}>
            <img src={tour.image} alt={tour.title} className={styles.image} />

            <div className={styles.content}>
                <h3 className={styles.title}>{tour.title}</h3>

                <div className={styles.info}>
                    <span>
                        <LuClock3 />
                        {tour.duration}
                    </span>

                    <span>
                        <PiMoney />
                        ${tour.price}
                    </span>
                </div>
            <button className={styles.detailsButton}>
                Detail<LuChevronRight />
            </button>
            </div>

        </div>
    );
};

export default TourCard;