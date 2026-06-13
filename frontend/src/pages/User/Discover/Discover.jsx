// pages/User/Discover/Discover.jsx
import { useState } from "react";

import styles from "./Discover.module.css";
import DiscoverHeader from "../../../components/Tourist/Discover/DiscoverHeader/DiscoverHeader";
import CategoryTabs from "../../../components/Tourist/Discover/CategoryTabs/CategoryTabs";
import ExploreCard from "../../../components/Tourist/Discover/ExploreCard/ExploreCard";
import ExploreSection from "../../../components/Tourist/Discover/ExploreSection/ExploreSection";
import ToursSection from "../../../components/Tourist/Discover/ToursSection/ToursSection";

function Discover() {
    const [searchQuery, setSearchQuery] = useState("");
    return (
        <div className={styles.discoverPage}>
            <DiscoverHeader searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}/>

            <p>
            Searching for: {searchQuery} ....
            </p>
            <CategoryTabs/>
            {/* <ExploreCard/> */}
            <ExploreSection searchQuery={searchQuery}/>

            <ToursSection
                searchQuery={searchQuery}
            />
        </div>
    );
}

export default Discover;