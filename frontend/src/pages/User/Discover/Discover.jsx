// pages/User/Discover/Discover.jsx


import styles from "./Discover.module.css";
import DiscoverHeader from "../../../components/Tourist/Discover/DiscoverHeader/DiscoverHeader";
import CategoryTabs from "../../../components/Tourist/Discover/CategoryTabs/CategoryTabs";
import ExploreCard from "../../../components/Tourist/Discover/ExploreCard/ExploreCard";
import ExploreSection from "../../../components/Tourist/Discover/ExploreSection/ExploreSection";
function Discover() {
    return (
        <div className={styles.discoverPage}>
            <DiscoverHeader/>
            <CategoryTabs/>
            {/* <ExploreCard/> */}
            <ExploreSection/>
        </div>
    );
}

export default Discover;