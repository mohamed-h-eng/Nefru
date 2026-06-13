import {Link} from 'react-router-dom'
import styles  from './Home.module.css'

import { Input } from '../../../shared/components/Inputs/Inputs'
import { MdOutlineLocationOn , MdSearch } from "react-icons/md";

import Header from './components/header/Header'
import Body from './components/body/Body'


const Home = () => {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <>
            <div className={styles.container}>
                <Header 
                    className={styles.header} 
                    onSearch={(query) => setSearchQuery(query)}
                />                
                <Body 
                    className={styles.body} 
                    searchQuery={searchQuery}
                />                
            </div>
        </>
    );
}

export default Home;
