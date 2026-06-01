import Style from "./Info.module.css";
import {Link, useNavigate} from 'react-router-dom'

const Info = () => {
     const navigate = useNavigate();
    return (
    <>
     <p>Info</p>
    <Link to="/user/trips/info/guide">guide</Link>
    <button onClick={() => navigate(-1)}>
      Go Back
    </button>
    </>
    )
}

export default Info;
