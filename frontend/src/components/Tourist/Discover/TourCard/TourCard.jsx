import styles from "./TourCard.module.css";

import { LuClock3, LuChevronRight } from "react-icons/lu";
import { PiMoney } from "react-icons/pi";

function TourCard({ tour }) {
// console.log("I AM THE REAL TOUR CARD");
    return (

        <div className={styles.card}>

            <img
                src={tour.image}
                alt={tour.title}
                className={styles.image}
            />

            <div className={styles.content}>

                <h3 className={styles.title}>
                    {tour.title}
                </h3>

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

            </div>

            <button className={styles.detailsButton}>

            
                    Details 

                <LuChevronRight />

            </button>

        </div>

    );
}

export default TourCard;