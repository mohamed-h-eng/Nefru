import { useState, useEffect } from 'react'
import styles from './Body.module.css'

import { Chips } from '../../../../../shared/components/chips/Chips'
import { Card, CardStrip } from '../../../../../shared/components/cards/Cards'
import defaultImage from '../../../../../assets/images/Hero Card 1.png'

export default function Body({ searchQuery }){
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrips = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:5000/api/trips?search=${searchQuery}`);
                const result = await response.json();
                if (result.success) {
                    setTrips(result.data);
                }
            } catch (error) {
                console.error("Error fetching trips:", error);
            } finally {
                setLoading(false);
            }
        };

        const timeoutId = setTimeout(fetchTrips, 500);
        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    // Format data for Card component
    const featuredCards = trips.slice(0, 3).map(trip => ({
        image: trip.image || defaultImage,
        tag: "TOP",
        location: trip.title,
        type: `${trip.category} • Guided`
    }));

    // Format data for CardStrip
    const topTrips = trips.map(trip => ({
        ...trip,
        image: trip.image || defaultImage
    }));

    return (
        <>
        <div className={styles.body}>
            <Chips />
            <div className={styles.card_cointainer}>
                <div className={styles.cards}>
                    <div className={styles.label}>
                        <p>Featured Niga Experiences</p>
                        <p>View all</p>
                    </div>
                    {loading ? <p>Loading experiences...</p> : <Card options={featuredCards}/>}
                </div>
                <div className={styles.trips}>
                    <div className={styles.label}>
                        <p>Top Trips</p>
                        <p>Filter</p>
                    </div>
                    {loading ? <p>Loading trips...</p> : <CardStrip options={topTrips} />}
                </div>
            </div>
        </div>
        </>
    )
}