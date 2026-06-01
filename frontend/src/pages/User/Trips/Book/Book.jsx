import Style from "./Book.module.css";
import {Link, useNavigate} from 'react-router-dom'

const Book = () => {
    const navigate = useNavigate();
    return (
    <>
    <p>book</p>
    <Link to="/user/trips/book/status">status</Link> 
    <button onClick={() => navigate(-1)}>
      Go Back
    </button>
    </>
    )
}

export default Book;
