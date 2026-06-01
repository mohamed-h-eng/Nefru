import styles from './Login.module.css'
import {Link} from 'react-router-dom'

function Login(){
    return(<>
    <p>login</p>
    <Link to="/user/home">Home</Link>
    </>)
}
export default Login