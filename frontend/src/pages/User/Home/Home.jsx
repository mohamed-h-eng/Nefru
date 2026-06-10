import { useState } from 'react'
import styles from './Home.module.css'

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
