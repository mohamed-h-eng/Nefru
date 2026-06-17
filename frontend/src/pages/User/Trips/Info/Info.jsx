import styles from "./Info.module.css";
import { useNavigate } from "react-router-dom";
import { FiUsers, FiTruck } from 'react-icons/fi';
import { MdOutlineBreakfastDining, MdOutlineHistoryEdu } from 'react-icons/md';

const Info = () => {
  const navigate = useNavigate();

  const Features = [
    {
      id: 1,
      icon: <FiUsers size={32} />,
      label: 'Small Group (Max 6)',
    },
    {
      id: 2,
      icon: <FiTruck size={32} />,
      label: 'Luxury Transfers',
    },
    {
      id: 3,
      icon: <MdOutlineBreakfastDining size={32} />,
      label: 'Breakfast Included',
    },
    {
      id: 4,
      icon: <MdOutlineHistoryEdu size={32} />,
      label: 'Expert Egyptologist',
    },
  ];
//hi
  return (
    <>
    
      <nav className={styles.navbar}>
      <button
        className={styles.backButton}
        onClick={() => navigate(-1)}
      >
        ←
      </button>

      <h4>Tours</h4>
    </nav>
    
    <div className={styles.body}>
      
      <div className={styles.infoimage}>
        <img
        src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dG91cnN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60"
        alt="Tour"/>  
      </div>
      
     <div className={styles.reserve}>
 
      <div className={styles.price}>
      <p>$189/person</p>
      <p>24oct-1guest</p>
      </div>

      <button className={styles.reserveButton}>
        Reserve 
      </button>
     </div>

     <h1 className={styles.tourName}>Majestic Pyramids &
Sphinx Exclusive
Sunrise Tour</h1>

 <div  className={styles.tourInfo}>
   <p>4.96(128 reviews) </p>
    <p>giza, egypt</p>
    
 </div>
 <p>4 hours</p>

 
    <h3>About this experience</h3>
    <p>
      Experience the awe-inspiring Great Pyramids
of Giza before the crowds arrive. This
exclusive sunrise tour offers unparalleled
access to one of the world's most iconic
ancient sites, bathed in the soft, golden light of
dawn.
    </p>
    <p>
     Accompanied by a leading Egyptologist, you'll
uncover the secrets of the Pharaohs, explore
the enigmatic Sphinx, and gain a profound
understanding of the monumental architecture
that has stood for millennia. This is not just a
tour; it's a curated journey into the heart of
ancient civilization, designed for the discerning
traveler seeking authenticity and depth.
    </p>

  <h3>Experience Highlights</h3>


<div className={styles.grid}>

      {Features.map(function (feature) {
        return (
          <div key={feature.id} className={styles.card}>

            <span className={styles.icon}>
              {feature.icon}
            </span>

           
            <p className={styles.label}>
              {feature.label}
            </p>

          </div>
        );
      })}

    </div>

    <h3>Meet your Guide</h3>
  

    </div>
    
    </>
  
    
  );
};

export default Info;