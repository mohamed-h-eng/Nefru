import styles from './DashboardStatus.module.css'

import Status from '../Status/Status'
import Table from '../Table/Table'
import {LineChart} from '../Status/Status'
import Icons from '../../../../assets/icons'

export default function DashboardStatus(){
    const tours = [
        { id: 1, tour: "Cairo Tour", bookings: 245, revenue: 12500, convRate: "8.4", rating: 4.8, status: "Active" },
        { id: 2, tour: "Luxor Escape", bookings: 189, revenue: 9800, convRate: "7.2", rating: 4.7, status: "Active" },
        { id: 3, tour: "Nile Cruise", bookings: 320, revenue: 18200, convRate: "10.1", rating: 4.9, status: "Popular" },
        { id: 4, tour: "Desert Safari", bookings: 98, revenue: 4300, convRate: "5.8", rating: 4.5, status: "Inactive" },
        { id: 5, tour: "Alex Day Trip", bookings: 156, revenue: 7600, convRate: "6.9", rating: 4.6, status: "Active" },
        { id: 6, tour: "Siwa Adventure", bookings: 87, revenue: 5100, convRate: "4.9", rating: 4.4, status: "Draft" }
    ];
    return(
        <>
        <div className={styles.container}>
            <div className={styles.title}>
                <h2 style={{fontSize:"32px"}}>Dahsboard Overview</h2>
                <p style={{fontSize:"14px"}}>Real-time insights and key metrics for the Nefru tourism platform</p>
            </div>
            <div className={styles.status}>
                <Status/>
                <div className={styles.section_1}>
                    <div className={styles.chart}>
                        <LineChart/>
                    </div>
                    <PendingList/>
                </div>
                <div className={styles.section_2}>
                    <div className={styles.chart}>
                        <Table title="Top Performing Trips" data={tours} headers={['#','Tour',"BOOKINGS","REVENUE","CONVERSION RATE","RATING","STATUS"]}/>
                    </div>
                    <PendingList/>
                </div>
            </div>
        </div>
        </>
    )
}

function PendingList(){
    return(
        <>
        <div className={styles.layout}>
            <div className={styles.layoutTitle}>
                <p>Pending Approvals</p>
                <p>View all</p>
            </div>
            <div className={styles.listBody}>
                <ListItem/>
                <ListItem/>
                <ListItem/>
                <ListItem/>
            </div>
        </div>
        </>
    )
}

function ListItem(){
    return(
        <>
        <div className={styles.itemContainer}>
            <div className={styles.itemInfo}>
                <div className={styles.itemAvatar}>
                    <Icons.Profile/>
                </div>
                <div className={styles.itemLable}>
                    <p>New Guide Application</p>
                    <p>Ahmed Mansour</p>
                </div>
                <div className={styles.itemTag}><p>Guide</p></div>
            </div>
            <div className={styles.itemAction}>
                <p>1d ago</p>
                <Icons.ArrowRight/>
            </div>
        </div>
        </>
    )
}