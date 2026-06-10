import Style from "./Status.module.css";
import {Link, useNavigate} from 'react-router-dom'

const Status = () => {
    const navigate = useNavigate();
    return (
    <>
    <p>status</p>
    <button onClick={() => navigate(-1)}>
      Go Back
    </button>
    </>
    )
}

export default Status;
