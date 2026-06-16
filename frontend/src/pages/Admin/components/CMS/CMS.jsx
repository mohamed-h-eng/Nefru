import styles from './CMS.module.css'
import Table from '../Table/Table'
import {Button }from '../../../../shared/components/Button/Button'
import {Input }from '../../../../shared/components/Inputs/Inputs'
import {useState} from 'react'
import Icons from '../../.././../assets/icons'

export default function CMS(){
    const users = [
//         {pagination: {
//     page: 1,
//     pageSize: 10,
//     total: 0,
//   }} add pagination data
        { id: 1, tour: "Cairo Tour", bookings: 245, revenue: 12500, convRate: "8.4", rating: 4.8, status: "Active" },
        { id: 2, tour: "Luxor Escape", bookings: 189, revenue: 9800, convRate: "7.2", rating: 4.7, status: "Active" },
        { id: 3, tour: "Nile Cruise", bookings: 320, revenue: 18200, convRate: "10.1", rating: 4.9, status: "Popular" },
        { id: 4, tour: "Desert Safari", bookings: 98, revenue: 4300, convRate: "5.8", rating: 4.5, status: "Inactive" },
        { id: 5, tour: "Alex Day Trip", bookings: 156, revenue: 7600, convRate: "6.9", rating: 4.6, status: "Active" },
        { id: 6, tour: "Siwa Adventure", bookings: 87, revenue: 5100, convRate: "4.9", rating: 4.4, status: "Draft" }
    ]
    const [activeTab,setActiveTab] = useState("Tours")
    const tabs = [
        {label:"Tours"},
        {label:"Explore"}
    ]
    return(
        <>
            <div className={styles.container}>
                <div className={styles.title}>
                    <h2 style={{fontSize:"32px"}}>Trips & Tours Management</h2>
                    <p style={{fontSize:"14px"}}>Curate and manage authentic travel experiences, pricing, and operational details.</p>
                </div>
                <div className={styles.body}>
                    <div className={styles.tabs}>
                        {
                            tabs.map((item,index)=>(
                                <Button 
                                    type={activeTab === item.label?"primary":"normal"}
                                    key={index}
                                    onClick={()=>setActiveTab(item.label)}>
                                        {item.label}
                                </Button>
                            ))
                        }
                    </div>
                    <div className={styles.info}>
                        <Table data={users} headers={['#','Tour',"BOOKINGS","REVENUE","CONVERSION RATE","RATING","STATUS"]}/>
                        
                        <div className={styles.edit}>
                            <div className={styles.section_1}>
                                <Icons.User/>
                                <p>Sarah Mahmoud</p>
                            </div>
                            <div className={styles.item}>
                                <p>Email</p>
                                <p>sarah.m@example.com</p>
                            </div>
                            <div className={styles.item}>
                                <p>Phone</p>
                                <p>+20 101 223 4455</p>
                            </div>
                            <div className={styles.item}>
                                <p>Created at</p>
                                <p>May 15, 2025</p>
                            </div>
                            <div className={styles.item}>
                                <p>Joined at</p>
                                <p>May 14, 2025</p>
                            </div>
                            <div className={styles.item}>
                                <p>Type</p>
                                <p className={styles.itemTag}>GUIDE</p>
                            </div>
                            <div className={styles.item}>
                                <p>Status</p>
                                <p className={styles.status}
                                    style={{
                                    color:"var(--color-active)",backgroundColor:"var(--color-active-mute)"
                                    }}>Pending</p>
                            </div>
                            
                            <div className={styles.actions}>
                                <Button icon={<Icons.CheckCircle/>} type="primary">Approve</Button>
                                <Button icon={<Icons.circleWrong/>} type="normal">Suspend</Button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

