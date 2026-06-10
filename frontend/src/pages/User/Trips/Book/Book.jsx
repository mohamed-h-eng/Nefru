import Style from "./Book.module.css";
import { Link, useNavigate } from "react-router-dom";
import Date from "./components/Date/Date";
import { Button } from "../../../../shared/components/Button/Button";
import Icons from "../../../../assets/icons";
import { useState } from "react";
import Counter from "./components/Counter/Counter";

const Book = () => {
  const navigate = useNavigate();
  const [activeSlot, setActiveSlot] = useState("Morning");
  const TIME_SLOTS = [
    { label: "Morning", icon: Icons.sun },
    { label: "Afternoon", icon: Icons.afternoon },
    { label: "Evening", icon: Icons.event },
  ];

  return (
    <>
      <Date />
      <div className="container">
        <div className="py-2">Select Time Slot</div>
        <div className={Style.slotsRow}>
          {TIME_SLOTS.map((slot, index) => (
            <div className={Style.timeSlot}>
              <Button
                className={`${Style.timeSlot}`}
                type="primary"
                key={index}
                onClick={() => setActiveSlot(slot.label)}
                type={slot.label == activeSlot ? "primary" : "normal"}
              >
                <slot.icon />
                {slot.label}
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className={` d-flex justify-content-between m-2`}>
        <div className="col-md-6">
          <h4>Travelers</h4>
          <span>$85.00 per person</span>
        </div>

        <div className="col-md-6">
          <Counter
            initialValue={1}
            min={1}
            max={10}
            onChange={(val) => console.log(val)}
          />
        </div>
      </div>

      <Link to="/user/trips/book/status">status</Link>
      <button onClick={() => navigate(-1)}>Go Back</button>
    </>
  );
};

export default Book;
