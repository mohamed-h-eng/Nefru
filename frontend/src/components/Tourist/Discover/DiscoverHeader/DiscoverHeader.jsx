import styles from "../DiscoverHeader/DiscoverHeader.module.css" ;
import { IoArrowBack } from "react-icons/io5";
import { LuSlidersHorizontal } from "react-icons/lu";


function DiscoverHeader() {

    return (

        <div className={styles.header}>

            <button className={styles.backButton}>                <IoArrowBack />
 </button>

            <input type="text" className={styles.searchInput} placeholder="Search 'Giza' or 'Luxor'" />

            <button className={styles.filterButton}>                <LuSlidersHorizontal />

 </button>

        </div>
    )
}

export default DiscoverHeader;