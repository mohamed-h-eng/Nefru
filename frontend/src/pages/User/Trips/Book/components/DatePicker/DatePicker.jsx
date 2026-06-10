import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.module.css";
import { useState } from "react";

const AVAILABLE_DATES = [
  new Date(2023, 9, 2),
  new Date(2023, 9, 6),
  new Date(2023, 9, 7),
  new Date(2023, 9, 10),
  new Date(2023, 9, 11),
];

export default function MyDatePicker() {
  const [selected, setSelected] = useState(new Date(2023, 9, 5));

  const isAvailable = (date) =>
    AVAILABLE_DATES.some(
      (d) => d.getDate() === date.getDate() && d.getMonth() === date.getMonth(),
    );

  return (
    <div className="p-3">
      <DatePicker
        selected={selected}
        onChange={(date) => setSelected(date)}
        inline
        highlightDates={AVAILABLE_DATES}
        dayClassName={(date) =>
          isAvailable(date) ? "available-day" : undefined
        }
      />
    </div>
  );
}
