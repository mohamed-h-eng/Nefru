import styles from "./Welcome.module.css";
import travelerImg from "../../../assets/images/traveler.jpg";
import guider from "../../../assets/images/tour-guide.png";

// import { AiOutlineArrowRight, AiOutlineGoogle, AiFillFacebook } from "react-icons/ai";
// import { RiTwitterXFill } from "react-icons/ri";
import Icons from "../../../assets/icons";
import { useNavigate, NavLink } from "react-router-dom";

import Logo_Dark from "../../../assets/images/Logo_Dark.png";

import {Button} from '../../../shared/components/Button/Button'

const roles = [
  {
    id: 1,
    title: "Traveler",
    desc: "Discover places and book tours.",
    img: travelerImg,
  },
  { 
    id: 2,
    title: "Tour Guide",
    desc: "Create tours and grow your business.",
    img: guider,
  },
];

export default function Welcome() {
  const navigate = useNavigate()
  return (
    <div className={styles.container}>
      <img src={Logo_Dark} alt="Logo_Dark" className={styles.logo} />

      <h2 className={styles.title}>
        Choose how you want to explore <span>Egypt</span>
      </h2>

      <div className={styles.cards}>
        {roles.map((role) => (
          <div key={role.id} className={styles.card}>
            <img
              src={role.img}
              alt={role.title}
              className={styles.cardImg}
            />

            <div className={styles.cardContent}>
              <h3>{role.title}</h3>
              <p>{role.desc}</p>
              <span className={styles.wrapper}>
                <NavLink to="/auth/register" typeUser={role.title.toLowerCase()} state={{ typeUser: role.title.toLowerCase() }} className={styles.getStarted}>
                {/* <AiOutlineArrowRight className={styles.arrow}/> */}
                <Icons.ArrowRight className={styles.arrow}/>
              </NavLink>
              </span>
            </div>
          </div>
        ))}
      </div>
      <Button onClick={() => navigate("/auth/login")}>Login</Button>

      <div className={styles.footer}>
        <div className={styles.socials}>
          <a href="#" className={styles.socialIcon}><Icons.Facebook size={24} /></a>
          <a href="#" className={styles.socialIcon}><Icons.Twitter size={22} /></a>
        </div>
        <p className={styles.slogan}>Unveiling the Timeless Wonders of the Nile.</p>
      </div>
    </div>
  );
}