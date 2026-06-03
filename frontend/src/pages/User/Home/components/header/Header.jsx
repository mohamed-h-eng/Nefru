import styles from './Header.module.css'
import {ButtonIcon} from '../../../../../shared/components/Button/Button'
import { MdOutlineLocationOn , MdSearch } from "react-icons/md";
import { FaRegBell } from "react-icons/fa";
import { InputIcon } from '../../../../../shared/components/Inputs/Inputs'

export default function Header(){
    return (
        <>
            <div className={styles.header}>
                <div className={styles.left_span}>
                    <div>
                        <ButtonIcon className={`${styles.icon_button} ${styles.icon_1}`}>
                            <MdOutlineLocationOn/>
                        </ButtonIcon>
                    </div>
                    <div className={styles.label}>
                        <p>Explore</p>
                        <p>Discover Egypt</p>
                    </div>
                </div>
                <div>
                    <ButtonIcon className={styles.icon_button}><FaRegBell style={{fontSize:"25px"}}/></ButtonIcon>
                </div>
            </div>
            <div className={styles.search}>
                <InputIcon placeholder="Search 'Giza' or 'Luxor'" icon={<MdSearch style={{fontSize:"30px" ,color:"var(--color-text-mute)"}}/>} />
            </div>
        </>
    );
}