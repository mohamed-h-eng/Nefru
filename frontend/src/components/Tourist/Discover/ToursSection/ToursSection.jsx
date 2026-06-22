import styles from "./ToursSection.module.css";

import TourCard from "../TourCard/TourCard";

//import images for the tours

import pyramidsImage from "../../../../assets/images/tours/pyramids.webp";
import luxorImage from "../../../../assets/images/tours/Luxor.jpg";
import khanImage from "../../../../assets/images/tours/khan-el-khalili.jpg";

function ToursSection({ searchQuery }) {
    // console.log("ToursSection Rendered");
    const tours = [

        {
            id: 1,
            title: "Giza Pyramids Half-Day Tour",
            duration: "4 Hours",
            price: 45,
            image: pyramidsImage,
        },

        {
            id: 2,
            title: "Luxor East Bank Tour",
            duration: "6 Hours",
            price: 65,
            image: luxorImage,
        },

        {
            id: 3,
            title: "Khan El Khalili Food Experience",
            duration: "3 Hours",
            price: 35,
            image: khanImage,
        },

    ];

    const filteredTours = tours.filter((tour) =>

        tour.title
            .toLowerCase()
            .includes(searchQuery.toLowerCase())

    );

    return (

        <section className={styles.section}>

            <div className={styles.header}>

                <h2>Tours</h2>

                <button>
                    View all
                </button>

            </div>

            <div className={styles.tours}>

                {filteredTours.map((tour) => (

                    <TourCard
                        key={tour.id}
                        tour={tour}
                    />

                ))}

            </div>

            {filteredTours.length === 0 && (

                <p>
                    No tours found.
                </p>

            )}

        </section>

    );
}

export default ToursSection;