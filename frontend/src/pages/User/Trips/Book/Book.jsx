import Style from "./Book.module.css";
import { Link } from "react-router-dom";
import Date from "./components/Date/Date";
import { Button } from "../../../../shared/components/Button/Button";
import Icons from "../../../../assets/icons";
import { useState } from "react";
import Counter from "./components/Counter/Counter";
import { MdOutlineVerified } from "react-icons/md";
import { IoArrowBack } from "react-icons/io5";
import { IoMdShare } from "react-icons/io";

const Book = () => {
  const [activeSlot, setActiveSlot] = useState("Morning");
  const TIME_SLOTS = [
    { label: "Morning", icon: Icons.sun },
    { label: "Afternoon", icon: Icons.afternoon },
    { label: "Evening", icon: Icons.event },
  ];
  return (
    <>
      {/* Header */}
      <div className="container d-flex justify-content-between align-items-center py-3">
        <div>
          <Link to={"/user/trips"} className={`${Style.backButton}`}>
            <IoArrowBack />
            {/* {Icons.back} */}
          </Link>
        </div>
        <div>Full Day Giza Pyramids & Sphinx</div>
        {/* <div>{Icons.share}</div> */}
        <div className={`${Style.backButton}`}>
          <IoMdShare />
        </div>
      </div>
      {/* Scadule */}
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
      <div
        className={`container d-flex justify-content-between bg-body-tertiary p-3`}
      >
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
      <div className="container mt-3">
        <div className="bg-body-tertiary p-4 rounded-4 shadow-sm">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
            <div>
              <p className="text-muted mb-1">October 5, 2023 • Morning</p>

              <span className="text-uppercase small text-secondary">
                Total Price
              </span>

              <h2 className="fw-bold mb-0">$170.00</h2>
            </div>

            <div className="d-flex align-items-center gap-2 text-success px-3 py-2 ">
              <MdOutlineVerified size={18} />
              <span className="fw-semibold">Best Price Guaranteed</span>
            </div>
          </div>
        </div>
      </div>
      <div className={"m-2"}>
        <Button type="primary">
          <Link to="/user/trips/book/status"></Link>
          Prosess to Payment
        </Button>
      </div>
    </>
  );
};

export default Book;
