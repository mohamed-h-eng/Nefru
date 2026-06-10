import styles from './Navbar.module.css';
import Icons from '../../../../../assets/icons'
import {Link} from 'react-router-dom'
import {Button} from '../../../../../shared/components/Button/Button'
import {Input} from '../../../../../shared/components/Inputs/Inputs'
export default function Navbar() {
  return (
    <div className={styles.navbar}>
        <div><h1>Nefru</h1></div>
        <div className={styles.account}>
          <div className="avatar"><Icons.User/></div>
          <div className="label">Super admin</div>
        </div>
    </div>
  );
}