import styles from './Accounts.module.css'
import Table,{AccountItem} from '../Table/Table'
import {Button }from '../../../../shared/components/Button/Button'
import {Input }from '../../../../shared/components/Inputs/Inputs'
import {useState} from 'react'
import Icons from '../../.././../assets/icons'

export default function Accounts(){
    const users = [
        { name: "Ahmed Hassan", email: "ahmed.hassan@example.com", role: "admin", status: "active", joined: "2023-01-15" },
        { name: "Sara Mohamed", email: "sara.mohamed@example.com", role: "tourist", status: "pending", joined: "2023-03-22" },
        { name: "Omar Ali", email: "omar.ali@example.com", role: "guide", status: "active", joined: "2023-05-10" },
        { name: "Mona Ibrahim", email: "mona.ibrahim@example.com", role: "tourist", status: "suspended", joined: "2023-07-18" },
        { name: "Youssef Khaled", email: "youssef.khaled@example.com", role: "admin", status: "active", joined: "2023-09-05" },
        { name: "Nour Abdelrahman", email: "nour.abdelrahman@example.com", role: "guide", status: "pending", joined: "2023-11-12" },
        { name: "Karim Mostafa", email: "karim.mostafa@example.com", role: "tourist", status: "active", joined: "2024-02-08" },
        { name: "Laila Samir", email: "laila.samir@example.com", role: "guide", status: "active", joined: "2024-04-25" },
        { name: "Hassan Adel", email: "hassan.adel@example.com", role: "admin", status: "suspended", joined: "2024-06-14" },
        { name: "Fatma Tarek", email: "fatma.tarek@example.com", role: "tourist", status: "pending", joined: "2024-08-30" }
        ]
    const [activeTab,setActiveTab] = useState("Tourists")
    const tabs = [
        {label:"Tourists"},
        {label:"Guides"},
        {label:"Admins"},
    ]
    return(
        <>
            <div className={styles.container}>
                <div className={styles.title}>
                    <h2 style={{fontSize:"32px"}}>Accounts Management</h2>
                    <p style={{fontSize:"14px"}}>Manage accounts status across the Nefru platform.</p>
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
                        <Table 
                            data={users}
                            headers={["NAME","EMAIL","ROLE","STATUS","JOINED"]}
                            item={AccountItem}/>
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

