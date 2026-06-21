import styles from "./Schedule.module.css";
import {
  FaArrowLeft,
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
  FaCalendarCheck,
  FaCircleInfo,
} from "react-icons/fa6";

function Schedule({ scheduleData, onBack, onNext, onAddSlot, onClearDates }) {
  const data = scheduleData || {
    selectedText: "Oct 8 - Oct 12",
    days: [
      { day: 28, muted: true }, { day: 29, muted: true }, { day: 30, muted: true }, { day: 31, muted: true },
      { day: 1 }, { day: 2 }, { day: 3 },
      { day: 4 }, { day: 5 }, { day: 6 }, { day: 7 }, { day: 8, selected: true }, { day: 9, selected: true }, { day: 10, selected: true },
      { day: 11, selected: true }, { day: 12, active: true }, { day: 13 }, { day: 14 }, { day: 15 }, { day: 16 }, { day: 17 },
      { day: 18 }, { day: 19 }, { day: 20 }, { day: 21 }, { day: 22 }, { day: 23 }, { day: 24 },
      { day: 25 }, { day: 26 }, { day: 27 }, { day: 28 },
    ],
    slots: [
      { id: 1, startTime: "09:00AM", endTime: "01:00 PM", maxGuests: 12 },
      { id: 2, startTime: "02:00 PM", endTime: "06:00 PM", maxGuests: 8 },
    ],
  };

  const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <button type="button" className={styles.iconButton} onClick={onBack}>
          <FaArrowLeft />
        </button>
        <h1>Select Date & Time</h1>
        <div className={styles.emptyBox}></div>
      </header>

      <main className={styles.content}>
        <div className={styles.stepper}>
          <div className={styles.line}></div>
          <div className={styles.activeLine}></div>
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={`${styles.step} ${step <= 2 ? styles.activeStep : ""}`}
            >
              {step}
            </div>
          ))}
        </div>

        <div className={styles.sections}>
          <section className={styles.card}>
            <div className={styles.calendarTop}>
              <button type="button" className={styles.smallRound}>
                <FaChevronLeft />
              </button>
              <button type="button" className={styles.smallRound}>
                <FaChevronRight />
              </button>
            </div>

            <div className={styles.weekRow}>
              {weekDays.map((day) => (
                <span key={day}>{day}</span>
              ))}
            </div>

            <div className={styles.daysGrid}>
              {data.days.map((item, index) => (
                <button
                  key={`${item.day}-${index}`}
                  type="button"
                  className={`${styles.dayButton} ${item.muted ? styles.mutedDay : ""} ${
                    item.selected ? styles.selectedDay : ""
                  } ${item.active ? styles.activeDay : ""}`}
                >
                  {item.day}
                </button>
              ))}
            </div>

            <div className={styles.selectedBox}>
              <div className={styles.selectedText}>
                <FaCalendarCheck />
                <span>Selected: {data.selectedText}</span>
              </div>

              <button type="button" className={styles.clearButton} onClick={onClearDates}>
                Clear
              </button>
            </div>
          </section>

          <section className={styles.card}>
            <div className={styles.timeHeader}>
              <h2>Time Slots</h2>
              <button type="button" className={styles.addButton} onClick={onAddSlot}>
                + ADD SLOT
              </button>
            </div>

            <div className={styles.slotsList}>
              {data.slots.map((slot) => (
                <div key={slot.id} className={styles.slotCard}>
                  <div className={styles.timeInputs}>
                    <label>
                      Start Time
                      <input type="text" defaultValue={slot.startTime} />
                    </label>

                    <label>
                      End Time
                      <input type="text" defaultValue={slot.endTime} />
                    </label>
                  </div>

                  <div className={styles.guestsRow}>
                    <span>Max Guests</span>
                    <div className={styles.counter}>
                      <button type="button">-</button>
                      <strong>{slot.maxGuests}</strong>
                      <button type="button">+</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.note}>
              <FaCircleInfo />
              <p>
                These time slots will be applied to all selected dates. You can
                adjust specific days later in the dashboard.
              </p>
            </div>

            <button type="button" className={styles.nextButton} onClick={onNext}>
              Next Step <FaArrowRight />
            </button>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Schedule;