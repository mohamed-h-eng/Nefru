import {
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  MapPin,
  UsersRound,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import defaultTourImage from "../../../assets/images/explore/pyramids.webp";
import { apiRequest, resolveMediaUrl } from "../../../services/api";
import styles from "./GuideCalendar.module.css";

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getDateKey(date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getMonthTitle(date) {
  return date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

function formatDisplayDate(dateKey) {
  if (!dateKey) return "";
  const d = new Date(`${dateKey}T00:00:00`);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function GuideCalendar() {
  const navigate = useNavigate();
  const [view, setView] = useState("Month");
  const [mobileTab, setMobileTab] = useState("Today");
  const [monthCursor, setMonthCursor] = useState(() => new Date());
  const [selectedDateKey, setSelectedDateKey] = useState(() => getDateKey(new Date()));

  const [tours, setTours] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [occurrences, setOccurrences] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [tripsRes, bookingsRes] = await Promise.all([
        apiRequest("/trips/guide/me").catch(() => ({ data: { tours: [] } })),
        apiRequest("/bookings/guide/me").catch(() => ({ data: { bookings: [], occurrences: [] } })),
      ]);

      setTours(tripsRes?.data?.tours || []);
      setBookings(bookingsRes?.data?.bookings || []);
      setOccurrences(bookingsRes?.data?.occurrences || []);
    } catch (err) {
      console.error("Error loading guide calendar data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Combine occurrences from bookings and schedule slots from all tours
  const allEventsByDate = useMemo(() => {
    const map = new Map();

    // 1. Add scheduled occurrences from active/draft tours
    tours.forEach((tour) => {
      const slots = tour.schedule?.slots || [];
      slots.forEach((slot) => {
        const dateKey = slot.date || slot.dateKey;
        if (!dateKey) return;

        if (!map.has(dateKey)) map.set(dateKey, []);
        map.get(dateKey).push({
          id: `${tour.id}-${slot.occurrenceKey || slot.startTime}`,
          tripId: tour.id,
          title: tour.title,
          location: tour.location,
          time: `${slot.startTime || "09:00"} - ${slot.endTime || "13:00"}`,
          startTime: slot.startTime || "09:00",
          guests: `0 / ${slot.capacity || tour.groupSize || 12}`,
          capacity: slot.capacity || tour.groupSize || 12,
          confirmedCount: 0,
          status: tour.statusText || tour.status,
          image: resolveMediaUrl(tour.image) || defaultTourImage,
          isOccurrence: false,
        });
      });
    });

    // 2. Add occurrences with real bookings (and override if matching)
    occurrences.forEach((occ) => {
      const dateKey = occ.date;
      if (!dateKey) return;

      const confirmed = (occ.bookings || []).filter((b) => b.status === "confirmed").length;
      const pending = (occ.bookings || []).filter((b) => b.status === "pending_payment").length;

      const list = map.get(dateKey) || [];
      const existingIdx = list.findIndex((item) => item.tripId === occ.tripId);

      const occData = {
        id: occ.occurrenceKey,
        tripId: occ.tripId,
        title: occ.title,
        location: occ.location,
        time: `${occ.startTime || "09:00"} - ${occ.endTime || "13:00"}`,
        startTime: occ.startTime || "09:00",
        guests: `${confirmed + pending} / ${occ.capacity || 12}`,
        capacity: occ.capacity || 12,
        confirmedCount: confirmed,
        status: confirmed > 0 ? "Booked" : pending > 0 ? "Pending" : "Active",
        image: resolveMediaUrl(occ.image) || defaultTourImage,
        isOccurrence: true,
      };

      if (existingIdx >= 0) {
        list[existingIdx] = occData;
      } else {
        list.push(occData);
      }
      map.set(dateKey, list);
    });

    return map;
  }, [tours, occurrences]);

  // Calendar Days for the active month
  const calendarDays = useMemo(() => {
    const year = monthCursor.getFullYear();
    const month = monthCursor.getMonth();
    const firstDayIndex = new Date(year, month, 1).getDay();
    const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const days = [];

    // Leading days from previous month
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i;
      const prevDate = new Date(year, month - 1, day);
      const dateKey = getDateKey(prevDate);
      days.push({
        day,
        dateKey,
        muted: true,
        selected: dateKey === selectedDateKey,
        events: allEventsByDate.get(dateKey) || [],
      });
    }

    // Days in current month
    for (let day = 1; day <= daysInCurrentMonth; day++) {
      const date = new Date(year, month, day);
      const dateKey = getDateKey(date);
      const dayEvents = allEventsByDate.get(dateKey) || [];

      const eventBadges = [];
      if (dayEvents.length > 0) {
        const bookedCount = dayEvents.filter((e) => e.confirmedCount > 0).length;
        if (bookedCount > 0) {
          eventBadges.push({ label: `${bookedCount} booked`, tone: "booked" });
        } else {
          eventBadges.push({ label: `${dayEvents.length} scheduled`, tone: "pending" });
        }
      }

      days.push({
        day,
        dateKey,
        muted: false,
        selected: dateKey === selectedDateKey,
        eventBadges,
        events: dayEvents,
      });
    }

    // Trailing days to fill 35 or 42 grid cells
    const remaining = (7 - (days.length % 7)) % 7;
    for (let day = 1; day <= remaining; day++) {
      const nextDate = new Date(year, month + 1, day);
      const dateKey = getDateKey(nextDate);
      days.push({
        day,
        dateKey,
        muted: true,
        selected: dateKey === selectedDateKey,
        events: allEventsByDate.get(dateKey) || [],
      });
    }

    return days;
  }, [monthCursor, selectedDateKey, allEventsByDate]);

  // Selected Day Schedule
  const selectedDaySchedule = useMemo(() => {
    return allEventsByDate.get(selectedDateKey) || [];
  }, [allEventsByDate, selectedDateKey]);

  // Dynamic Summary Cards
  const summaryCards = useMemo(() => {
    const todayStr = getDateKey(new Date());
    const yearMonthStr = `${monthCursor.getFullYear()}-${String(monthCursor.getMonth() + 1).padStart(2, "0")}`;

    const bookingsToday = bookings.filter((b) => b.slotDate === todayStr || b.date?.startsWith(todayStr)).length;
    const bookingsThisMonth = bookings.filter((b) => b.slotDate?.startsWith(yearMonthStr) || b.date?.startsWith(yearMonthStr)).length;
    const earningsThisMonth = bookings
      .filter((b) => ["confirmed", "completed"].includes(b.status) && (b.slotDate?.startsWith(yearMonthStr) || b.date?.startsWith(yearMonthStr)))
      .reduce((sum, b) => sum + (Number(b.guideEarnings || b.totalPrice) || 0), 0);

    return [
      {
        label: "Bookings Today",
        value: String(bookingsToday),
        icon: UsersRound,
        helper: `${bookingsToday} traveler reservation(s)`,
      },
      {
        label: "Bookings This Month",
        value: String(bookingsThisMonth),
        icon: CalendarDays,
        helper: `In ${getMonthTitle(monthCursor)}`,
      },
      {
        label: "Earnings This Month",
        value: `$${earningsThisMonth.toLocaleString()}`,
        icon: CircleDollarSign,
        helper: "From confirmed bookings",
      },
    ];
  }, [bookings, monthCursor]);

  // Reminders list
  const reminders = useMemo(() => {
    const pendingList = bookings.filter((b) => b.status === "pending_payment");
    const items = [];

    if (pendingList.length > 0) {
      items.push({
        title: `${pendingList.length} pending booking(s)`,
        helper: `${pendingList[0].title} held for payment`,
        tone: "pending",
        link: "/guide/bookings",
      });
    }

    const todayStr = getDateKey(new Date());
    const todayOcc = occurrences.filter((occ) => occ.date === todayStr);
    if (todayOcc.length > 0) {
      items.push({
        title: "Your trip today",
        helper: `${todayOcc[0].title} at ${todayOcc[0].startTime || "09:00 AM"}`,
        tone: "booked",
        link: "/guide/bookings",
      });
    } else {
      items.push({
        title: "Availability Active",
        helper: "Add slots in tour schedule anytime",
        tone: "booked",
        link: "/guide",
      });
    }

    return items;
  }, [bookings, occurrences]);

  const weekStrip = useMemo(() => {
    const now = new Date();
    const currDay = now.getDay();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - currDay);

    return Array.from({ length: 7 }, (_, index) => {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + index);
      const dKey = getDateKey(d);
      return {
        label: weekDays[d.getDay()].toUpperCase(),
        day: d.getDate(),
        dateKey: dKey,
        selected: dKey === selectedDateKey,
      };
    });
  }, [selectedDateKey]);

  function prevMonth() {
    setMonthCursor((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  }

  function nextMonth() {
    setMonthCursor((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  }

  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <div>
          <span className={styles.eyebrow}>Your availability</span>
          <h1>Trip Calendar</h1>
          <p>Manage your schedule, bookings, and availability across your tours.</p>
        </div>
      </header>

      <section className={`${styles.card} ${styles.mobileDateCard}`}>
        <div className={styles.mobileMonthRow}>
          <button type="button" aria-label="Previous month" onClick={prevMonth}>
            <ChevronLeft size={20} />
          </button>
          <strong>
            {getMonthTitle(monthCursor)} <ChevronDown size={17} />
          </strong>
          <button type="button" aria-label="Next month" onClick={nextMonth}>
            <ChevronRight size={20} />
          </button>
        </div>

        <div className={styles.weekStrip}>
          {weekStrip.map((item) => (
            <button
              key={item.dateKey}
              type="button"
              className={item.selected ? styles.selectedWeekDay : ""}
              onClick={() => setSelectedDateKey(item.dateKey)}
            >
              <small>{item.label}</small>
              <strong>{item.day}</strong>
              {item.selected && <span aria-hidden="true" />}
            </button>
          ))}
        </div>

        <div className={styles.segmentedControl}>
          {["Today", "Upcoming", "Completed"].map((tab) => (
            <button
              type="button"
              key={tab}
              className={mobileTab === tab ? styles.activeSegment : ""}
              onClick={() => setMobileTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </section>

      <div className={styles.calendarLayout}>
        <div className={styles.primaryColumn}>
          <section className={`${styles.card} ${styles.desktopCalendarCard}`}>
            <div className={styles.calendarToolbar}>
              <div className={styles.viewSwitcher}>
                {["Month"].map((item) => (
                  <button
                    type="button"
                    key={item}
                    className={view === item ? styles.activeView : ""}
                    onClick={() => setView(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className={styles.monthNavigation}>
                <button type="button" aria-label="Previous month" onClick={prevMonth}>
                  <ChevronLeft size={19} />
                </button>
                <strong>
                  {getMonthTitle(monthCursor)} <ChevronDown size={17} />
                </strong>
                <button type="button" aria-label="Next month" onClick={nextMonth}>
                  <ChevronRight size={19} />
                </button>
              </div>

              <button
                type="button"
                className={styles.filterButton}
                onClick={() => setSelectedDateKey(getDateKey(new Date()))}
              >
                Today
              </button>
            </div>

            <div className={styles.calendarGrid}>
              {weekDays.map((day) => (
                <div className={styles.weekDayHeader} key={day}>
                  {day}
                </div>
              ))}

              {calendarDays.map((item, index) => (
                <button
                  type="button"
                  key={`${item.dateKey}-${index}`}
                  className={`${styles.dayCell} ${item.muted ? styles.mutedDay : ""} ${
                    item.selected ? styles.selectedDay : ""
                  }`}
                  onClick={() => setSelectedDateKey(item.dateKey)}
                >
                  <span className={styles.dayNumber}>{item.day}</span>
                  <span className={styles.dayEvents}>
                    {item.eventBadges?.map((event) => (
                      <span key={event.label} className={styles[event.tone]}>
                        <i aria-hidden="true" /> {event.label}
                      </span>
                    ))}
                  </span>
                </button>
              ))}
            </div>

            <div className={styles.legend}>
              <span><i className={styles.booked} /> Booked</span>
              <span><i className={styles.pending} /> Scheduled / Availability</span>
              <span><i className={styles.reminder} /> Reminder</span>
            </div>
          </section>

          {/* Day Schedule */}
          <section className={`${styles.card} ${styles.scheduleCard}`}>
            <div className={styles.sectionHeader}>
              <div>
                <h2>Day Schedule</h2>
                <p>{formatDisplayDate(selectedDateKey)}</p>
              </div>
              <button
                type="button"
                onClick={() => navigate("/guide/bookings")}
              >
                View Bookings <ChevronRight size={17} />
              </button>
            </div>

            {selectedDaySchedule.length === 0 ? (
              <div style={{ padding: "24px 0", textAlign: "center", color: "var(--color-text-muted)" }}>
                <p>No trips or availability slots scheduled for this date.</p>
                <button
                  type="button"
                  className={styles.filterButton}
                  style={{ marginTop: "12px" }}
                  onClick={() => navigate("/guide")}
                >
                  Manage Tour Schedules
                </button>
              </div>
            ) : (
              <div className={styles.scheduleList}>
                {selectedDaySchedule.map((item, idx) => (
                  <article className={styles.scheduleRow} key={`${item.id}-${idx}`}>
                    <time>{item.startTime}</time>
                    <span className={styles.scheduleDot} aria-hidden="true" />
                    <img src={item.image} alt={item.title} aria-hidden="true" />
                    <div className={styles.scheduleMain}>
                      <h3>{item.title}</h3>
                      <span><MapPin size={14} /> {item.location}</span>
                    </div>
                    <span className={styles.scheduleGuests}>
                      <UsersRound size={16} /> {item.guests}
                    </span>
                    <span className={styles.scheduleStatus}>{item.status}</span>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Sidebar */}
        <aside className={styles.sideColumn}>
          <section className={styles.summaryGrid}>
            {summaryCards.map((item) => {
              const Icon = item.icon;
              return (
                <article className={styles.summaryCard} key={item.label}>
                  <span><Icon size={20} /></span>
                  <strong>{item.value}</strong>
                  <small>{item.label}</small>
                  <em>{item.helper}</em>
                </article>
              );
            })}
          </section>

          <section className={`${styles.card} ${styles.remindersCard}`}>
            <div className={styles.sectionHeader}>
              <div>
                <h2>Reminders &amp; Alerts</h2>
              </div>
            </div>
            <div className={styles.reminderList}>
              {reminders.map((item) => (
                <button
                  type="button"
                  key={item.title}
                  onClick={() => item.link && navigate(item.link)}
                >
                  <span className={`${styles.reminderIcon} ${styles[item.tone]}`}>
                    <Clock3 size={18} />
                  </span>
                  <span>
                    <strong>{item.title}</strong>
                    <small>{item.helper}</small>
                  </span>
                  <ChevronRight size={18} />
                </button>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
