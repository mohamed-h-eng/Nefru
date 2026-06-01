import Style from "./Settings.module.css";
import {Link} from 'react-router-dom'

function Settings(){
    return(
        <>
        <p>Settings</p>
        <Link to="/user/home">home</Link>
        </>
    )
}

export default Settings;
