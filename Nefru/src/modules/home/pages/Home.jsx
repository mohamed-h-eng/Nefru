import styles  from './Home.module.css'

import { InputIcon } from '../../../shared/components/inputs/inputs'
import { MdOutlineLocationOn , MdSearch } from "react-icons/md";

import Header from '../components/header/Header'
import Body from '../components/body/Body'
import Navbar from '../components/navbar/Navbar'
const Home = () => {
    return (
        <>
            <div className={styles.container}>
                <Header className={styles.header}/>                
                <Body className={styles.body}/>
                <Navbar />
            </div>
            
        </>
    );
}

export default Home;
