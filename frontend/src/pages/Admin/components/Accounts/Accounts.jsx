import styles from './Accounts.module.css'
import Table from '../Table/Table'

export default function Accounts(){
    return(
        <>
        <div className={styles.container}>
            <div className={styles.title}>
                <h2 style={{fontSize:"32px"}}>Dahsboard Overview</h2>
                <p style={{fontSize:"14px"}}>Real-time insights and key metrics for the Nefru tourism platform</p>
            </div>
            <div className={styles.status}>
                {/* <Status/> */}
                <div className={styles.section_1}>
                    <div className={styles.chart}>
                        {/* <LineChart/> */}
                    </div>
                    {/* <List title="Pending Approvals">
                        <PendingItem info="Guide application approval" name="Sarah Mahmoud" tag="Guide" duration="1d ago"/>
                    </List> */}
                </div>
                <div className={styles.section_2}>
                    <div className={styles.chart}>
                        <Table title="" headers={['USER','EMAIL',"ROLE","STATUS","JOINED"]}/>
                    </div>
                    {/* <List title="Recent System Logs"/> */}
                </div>
            </div>
        </div>
        </>
    )
}