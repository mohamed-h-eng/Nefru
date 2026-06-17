import {Link} from 'react-router-dom'
import styles  from './Home.module.css'

import { Input } from '../../../shared/components/Inputs/Inputs'
import { MdOutlineLocationOn , MdSearch } from "react-icons/md";

import Header from './components/header/Header'
import Body from './components/body/Body'


const Home = () => {
    return (
        <>
            <div className={styles.container}>
                <Header className={styles.header}/>                
                <Body className={styles.body}/>                
            </div>
        </>
    );
}

export default Home;
