import styles from './Form.module.css'
import {Input, InputDual} from '../../Ui/Input/Input'
import Button from '../../Ui/Button/Button'

export default function Form(){
    return (<>
        <div className={styles.container}>
            <div className={styles.header}>
                <p>Add New Event</p>
            </div>
            <Input title="Event Title" placeholder="Enter title"/>
            <InputDual>
                <Input title="Category" placeholder="Enter category"/>
                <Input title="Capacity" placeholder="Enter capacity"/>
            </InputDual>
            <Input title="Date & Time" placeholder="Enter date & time"/>
            <Input title="Venue Location" placeholder="Enter venue location"/>
            <Input title="Ticket Price($)" placeholder="0.00"/>
            <Button>Publish Event</Button>
        </div>
    </>)
}