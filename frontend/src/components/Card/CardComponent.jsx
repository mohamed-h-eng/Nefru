import Button from '../../Ui/Button/Button';
import Card from 'react-bootstrap/Card';
import Style from "./CardComponent.module.css";
import { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { FaMapMarkerAlt } from "react-icons/fa";
import Cardimg from '../../../assets/images/Cardimage.png';
function CardComponent({ event }) {
  const [favourite, setFavourite] = useState(false);  
  const eventDate = new Date(event.date);
  const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(eventDate);
  const day = new Intl.DateTimeFormat('en-US', { day: 'numeric' }).format(eventDate);

  return (
    <Card className={Style.card}>
      <button
        type="button"
        className={Style.favBtn}
        aria-label="Toggle favorite"
        onClick={() => setFavourite(!favourite)}
      >
        {favourite ? <FaHeart color="white" /> : <FaRegHeart color="white" />}
      </button>
      <div className={Style.dateCard}>
        <span className={Style.dateMonth}>{month}</span>
        <span className={Style.dateDay}>{day}</span>
      </div>
      <Card.Img variant="top" src={Cardimg} className={Style.image} alt={event.title} />
      <Card.Body className={Style.body}>
        <Card.Title className={Style.title}>{event.title}</Card.Title>
        <Card.Text className={Style.description}>{event.description}</Card.Text>
        <div className={Style.location}>
          <FaMapMarkerAlt />
          {event.location}
        </div>
        <Button className={Style.actionButton}>Book Ticket</Button>
      </Card.Body>
    </Card>
  );
}

export default CardComponent;