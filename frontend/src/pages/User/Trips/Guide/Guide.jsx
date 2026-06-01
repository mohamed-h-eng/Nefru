import Style from "./Guide.module.css";
import {Link, useNavigate} from 'react-router-dom'

const Guide = () => {
    const navigate = useNavigate();

    return (
    <>
    <p>Guide</p>
    <button onClick={() => navigate(-1)}>
      Go Back
    </button>
    </>
    )
}

export default Guide;
