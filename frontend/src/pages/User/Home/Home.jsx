import Style from "./Home.module.css";
import {Link} from 'react-router-dom'

function Home(){
    return(<>
    <p>Home</p>
    <Link to="/user/home">home</Link>
    <Link to="/user/trips">trips</Link>
    <Link to="/user/saved">saved</Link>
    <Link to="/user/profile">profile</Link>
    </>)
}

export default Home;
