// pages/User/Discover/Discover.jsx


import styles from "./Discover.module.css";
import DiscoverHeader from "../../../components/Tourist/Discover/DiscoverHeader/DiscoverHeader";
import CategoryTabs from "../../../components/Tourist/Discover/CategoryTabs/CategoryTabs";
function Discover() {
    return (
        <div className={styles.discoverPage}>
            <DiscoverHeader/>
            <CategoryTabs/>
        </div>
    );
}

export default Discover;