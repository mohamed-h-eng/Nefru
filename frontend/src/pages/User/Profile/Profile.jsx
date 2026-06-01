import Style from "./Profile.module.css";
import {Link} from 'react-router-dom'

function Profile(){
    return(<>
    <p>Profile</p>
    <Link to="/user/home">home</Link>
    <Link to="/user/trips">trips</Link>
    <Link to="/user/saved">saved</Link>
    <Link to="/user/profile">profile</Link>
    </>)
}

export default Profile;
