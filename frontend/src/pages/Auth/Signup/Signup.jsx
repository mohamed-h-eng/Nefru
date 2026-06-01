import styles from './Signup.module.css'
import {Link} from 'react-router-dom'

function Signup(){
    return(<>
    <p>Signup</p>
    <Link to="/auth/login">login</Link>
    </>)
}
export default Signup