import { useCallback, useEffect, useMemo, useState } from "react";
import {
  BellRing,
  CalendarDays,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Compass,
  MapPin,
  MapPinned,
  Plus,
  RefreshCw,
  ShieldAlert,
  Star,
  UsersRound,
} from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import defaultTourImage from "../../../assets/images/explore/pyramids.webp";
import { apiRequest, resolveMediaUrl } from "../../../services/api";
import styles from "./GuideDashboard.module.css";

function SectionAction({ children, onClick }) {
  return (
    <button type="button" className={styles.sectionAction} onClick={onClick}>
      {children}
      <ChevronRight size={17} aria-hidden="true" />
    </button>
  );
}

function formatDateDisplay(dateStr) {
  if (!dateStr) return "Flexible";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatDayOfWeek(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { weekday: "short" });
}

function isDateToday(dateStr) {
  if (!dateStr) return false;
  const today = new Date().toISOString().slice(0, 10);
  return dateStr.startsWith(today);
}

export default function GuideDashboard() {
  const navigate = useNavigate();
  const { user, profile } = useSelector((state) => state.auth);

  const [tours, setTours] = useState([]);
  const [tourCounts, setTourCounts] = useState({ all: 0, active: 0, reviewing: 0, draft: 0 });
  const [bookings, setBookings] = useState([]);
  const [occurrences, setOccurrences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const guideName = profile?.fullName || profile?.name || user?.email?.split("@")[0] || "Guide";

  const loadDashboardData = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const [tripsRes, bookingsRes] = await Promise.all([
        apiRequest("/trips/guide/me").catch(() => ({ data: { tours: [], counts: {} } })),
        apiRequest("/bookings/guide/me").catch(() => ({ data: { bookings: [], occurrences: [] } })),
      ]);

      const fetchedTours = tripsRes?.data?.tours || [];
      setTours(fetchedTours);
      setTourCounts(
        tripsRes?.data?.counts || {
          all: fetchedTours.length,
          active: fetchedTours.filter((t) => t.status === "active").length,
          reviewing: fetchedTours.filter((t) => t.status === "reviewing").length,
          draft: fetchedTours.filter((t) => t.status === "draft").length,
        },
      );

      setBookings(bookingsRes?.data?.bookings || []);
      setOccurrences(bookingsRes?.data?.occurrences || []);
    } catch (err) {
      console.error("Error loading guide dashboard data:", err);
      setError("Failed to load dashboard data. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  // Derived Statistics
  const confirmedBookings = useMemo(
    () => bookings.filter((b) => ["confirmed", "completed"].includes(b.status)),
    [bookings],
  );

  const totalGuests = useMemo(
    () => confirmedBookings.reduce((sum, b) => sum + (Number(b.numberOfGuests) || 1), 0),
    [confirmedBookings],
  );

  const totalEarnings = useMemo(
    () =>
      confirmedBookings.reduce(
        (sum, b) => sum + (Number(b.guideEarnings || b.totalPrice) || 0),
        0,
      ),
    [confirmedBookings],
  );

  const stats = useMemo(() => {
    const activeCount = tourCounts.active || 0;
    const allCount = tourCounts.all || tours.length || 0;

    return [
      {
        label: "My Tours",
        value: String(allCount),
        helper: `${activeCount} active · ${tourCounts.draft || 0} draft`,
        icon: MapPinned,
        tone: "blue",
      },
      {
        label: "Total Guests",
        value: String(totalGuests),
        helper: "Across all tours",
        icon: UsersRound,
        tone: "gold",
      },
      {
        label: "Avg. Rating",
        value: `${Number(profile?.rating || 5.0).toFixed(1)} / 5`,
        helper: `From ${profile?.reviewsCount || 0} reviews`,
        icon: Star,
        tone: "gold",
      },
      {
        label: "Total Earnings",
        value: `$${totalEarnings.toLocaleString()}`,
        helper: `${confirmedBookings.length} confirmed bookings`,
        icon: CircleDollarSign,
        tone: "green",
      },
    ];
  }, [tourCounts, tours.length, totalGuests, profile, totalEarnings, confirmedBookings.length]);

  // Find Next Trip: Earliest upcoming occurrence with bookings or scheduled slot
  const nextTrip = useMemo(() => {
    const now = new Date();

    // 1. Check occurrences with bookings first
    const upcomingOccurrences = occurrences
      .map((occ) => {
        const start = occ.startsAt
          ? new Date(occ.startsAt)
          : new Date(`${occ.date}T${String(occ.startTime || "00:00").slice(0, 5)}:00`);
        const confirmed = (occ.bookings || []).filter((b) => b.status === "confirmed").length;
        const totalBooked = (occ.bookings || []).filter((b) =>
          ["confirmed", "pending_payment"].includes(b.status),
        ).length;
        const earnings = (occ.bookings || [])
          .filter((b) => b.status === "confirmed")
          .reduce((sum, b) => sum + (Number(b.guideEarnings || b.totalPrice) || 0), 0);

        return {
          id: occ.tripId,
          occurrenceKey: occ.occurrenceKey,
          title: occ.title,
          location: occ.location,
          date: formatDateDisplay(occ.date),
          dayOfWeek: formatDayOfWeek(occ.date),
          time: occ.startTime,
          guests: `${totalBooked} / ${occ.capacity || 12}`,
          earnings: `$${earnings}`,
          status: isDateToday(occ.date) ? "Today" : "Upcoming",
          image: resolveMediaUrl(occ.image) || defaultTourImage,
          startDate: start,
        };
      })
      .filter((occ) => occ.startDate >= now || isDateToday(occ.date))
      .sort((a, b) => a.startDate - b.startDate);

    if (upcomingOccurrences.length > 0) {
      return upcomingOccurrences[0];
    }

    // 2. If no occurrences with bookings, check slots from active tours
    const allSlots = [];
    tours.forEach((tour) => {
      const slots = tour.schedule?.slots || [];
      slots.forEach((slot) => {
        const slotDate = slot.date || slot.dateKey;
        if (!slotDate) return;
        const start = new Date(`${slotDate}T${String(slot.startTime || "00:00").slice(0, 5)}:00`);
        if (start >= now || isDateToday(slotDate)) {
          allSlots.push({
            id: tour.id,
            occurrenceKey: slot.occurrenceKey,
            title: tour.title,
            location: tour.location,
            date: formatDateDisplay(slotDate),
            dayOfWeek: formatDayOfWeek(slotDate),
            time: slot.startTime || "09:00 AM",
            guests: `0 / ${slot.capacity || tour.groupSize || 12}`,
            earnings: `$${tour.price || 0}`,
            status: isDateToday(slotDate) ? "Today" : "Scheduled",
            image: resolveMediaUrl(tour.image) || defaultTourImage,
            startDate: start,
          });
        }
      });
    });

    allSlots.sort((a, b) => a.startDate - b.startDate);
    if (allSlots.length > 0) return allSlots[0];

    // 3. If guide has active tours but no upcoming slots, return the first active tour
    if (tours.length > 0) {
      const tour = tours.find((t) => t.status === "active") || tours[0];
      return {
        id: tour.id,
        title: tour.title,
        location: tour.location,
        date: formatDateDisplay(tour.createdAt),
        dayOfWeek: formatDayOfWeek(tour.createdAt),
        time: tour.duration || "Full day",
        guests: `Max ${tour.groupSize || 12}`,
        earnings: `$${tour.price || 0}`,
        status: tour.statusText || tour.status,
        image: resolveMediaUrl(tour.image) || defaultTourImage,
        isGeneralTour: true,
      };
    }

    return null;
  }, [occurrences, tours]);

  // Today's / Upcoming schedule timeline
  const scheduleItems = useMemo(() => {
    const todayStr = new Date().toISOString().slice(0, 10);
    const todayOccurrences = occurrences.filter((occ) => occ.date === todayStr);

    if (todayOccurrences.length > 0) {
      return todayOccurrences.map((occ) => ({
        time: occ.startTime || "09:00 AM",
        title: occ.title,
        location: occ.location,
        guests: (occ.bookings || []).filter((b) => ["confirmed", "pending_payment"].includes(b.status)).length,
      }));
    }

    // If none today, show next upcoming occurrences or slots
    const upcomingOccs = occurrences
      .filter((occ) => occ.date >= todayStr)
      .slice(0, 3)
      .map((occ) => ({
        time: `${formatDateDisplay(occ.date)} · ${occ.startTime || "09:00 AM"}`,
        title: occ.title,
        location: occ.location,
        guests: (occ.bookings || []).filter((b) => ["confirmed", "pending_payment"].includes(b.status)).length,
      }));

    return upcomingOccs;
  }, [occurrences]);

  // Dynamic Reminders & Alerts
  const reminders = useMemo(() => {
    const items = [];

    if (profile?.verificationStatus && profile.verificationStatus !== "approved") {
      items.push({
        title: `Verification is ${profile.verificationStatus}`,
        helper: "Submit verification to enable bookings",
        icon: ShieldAlert,
        tone: "gold",
        link: "/guide/verification",
      });
    }

    if (tourCounts.draft > 0) {
      items.push({
        title: `${tourCounts.draft} draft tour(s) ready to publish`,
        helper: "Complete and submit for review",
        icon: CalendarDays,
        tone: "blue",
        link: "/guide",
      });
    }

    const pendingPayment = bookings.filter((b) => b.status === "pending_payment");
    if (pendingPayment.length > 0) {
      items.push({
        title: `${pendingPayment.length} place hold(s) active`,
        helper: "Waiting for traveler payment",
        icon: Clock3,
        tone: "green",
        link: "/guide/bookings",
      });
    }

    if (nextTrip && !nextTrip.isGeneralTour) {
      items.push({
        title: `Next trip: ${nextTrip.title}`,
        helper: `${nextTrip.date} at ${nextTrip.time}`,
        icon: UsersRound,
        tone: "blue",
        link: "/guide/bookings",
      });
    }

    if (items.length === 0) {
      items.push({
        title: "All systems active",
        helper: "Your profile and tours are up to date",
        icon: Star,
        tone: "green",
        link: "/guide/profile",
      });
    }

    return items;
  }, [profile, tourCounts, bookings, nextTrip]);

  // Dynamic Recent Activity
  const activities = useMemo(() => {
    const items = [];

    // Recent bookings
    bookings.slice(0, 3).forEach((b) => {
      items.push({
        title: b.status === "confirmed" ? "New booking confirmed" : `Booking ${b.status}`,
        helper: `${b.title} · ${b.tourist || "Traveler"}`,
        time: formatDateDisplay(b.date),
        icon: UsersRound,
        tone: b.status === "confirmed" ? "green" : "blue",
      });
    });

    // Recent tours
    if (items.length < 3) {
      tours.slice(0, 3 - items.length).forEach((t) => {
        items.push({
          title: `Tour: ${t.title}`,
          helper: `${t.statusText || t.status} · $${t.price}/person`,
          time: formatDateDisplay(t.createdAt),
          icon: Compass,
          tone: t.status === "active" ? "green" : "gold",
        });
      });
    }

    return items;
  }, [bookings, tours]);

  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <div className={styles.headerText}>
          <span className={styles.eyebrow}>Guide workspace</span>
          <h1>Welcome, {guideName}</h1>
          <p>Manage your booked tours, guests, and schedule in real-time.</p>
        </div>

        <div className={styles.headerActions}>
          <button
            type="button"
            className={styles.createButtonHeader}
            onClick={() => navigate("/guide/createtour")}
          >
            <Plus size={18} />
            Create Tour
          </button>
          <button
            type="button"
            className={styles.refreshButtonHeader}
            onClick={loadDashboardData}
            title="Refresh dashboard"
            aria-label="Refresh dashboard"
            disabled={loading}
          >
            <RefreshCw size={18} className={loading ? styles.spinning : ""} />
          </button>
        </div>
      </header>

      {error && <p className={styles.errorMessage}>{error}</p>}

      <div className={styles.dashboardGrid}>
        <div className={styles.primaryColumn}>
          {/* Next Trip Card */}
          {nextTrip ? (
            <section className={`${styles.card} ${styles.nextTourCard}`}>
              <div className={styles.cardHeading}>
                <h2>
                  Next Trip <Star size={18} fill="currentColor" aria-hidden="true" />
                </h2>
                <span
                  className={`${styles.todayBadge} ${
                    nextTrip.status === "Today" ? styles.statusToday : ""
                  }`}
                >
                  • {nextTrip.status}
                </span>
              </div>

              <div className={styles.nextTourContent}>
                <img
                  src={nextTrip.image}
                  alt={nextTrip.title}
                  className={styles.nextTourImage}
                />

                <div className={styles.nextTourDetails}>
                  <h3>{nextTrip.title}</h3>

                  <div className={styles.detailGrid}>
                    <div className={styles.detailItem}>
                      <CalendarDays size={20} aria-hidden="true" />
                      <span>
                        <strong>{nextTrip.date}</strong>
                        <small>{nextTrip.dayOfWeek || "Scheduled"}</small>
                      </span>
                    </div>
                    <div className={styles.detailItem}>
                      <Clock3 size={20} aria-hidden="true" />
                      <span>
                        <strong>{nextTrip.time}</strong>
                        <small>Start Time</small>
                      </span>
                    </div>
                    <div className={styles.detailItem}>
                      <MapPin size={20} aria-hidden="true" />
                      <span>
                        <strong>{nextTrip.location}</strong>
                        <small>Meeting Location</small>
                      </span>
                    </div>
                    <div className={styles.detailItem}>
                      <UsersRound size={20} aria-hidden="true" />
                      <span>
                        <strong>{nextTrip.guests}</strong>
                        <small>Guests / Capacity</small>
                      </span>
                    </div>
                    <div className={styles.detailItem}>
                      <CircleDollarSign size={20} aria-hidden="true" />
                      <span>
                        <strong>{nextTrip.earnings}</strong>
                        <small>Earnings</small>
                      </span>
                    </div>
                  </div>

                  <div className={styles.nextTourActions}>
                    <button
                      type="button"
                      className={styles.primaryButton}
                      onClick={() => navigate("/guide/bookings")}
                    >
                      View Bookings <ChevronRight size={18} />
                    </button>
                    <button
                      type="button"
                      className={styles.secondaryButton}
                      onClick={() =>
                        navigate("/guide/createtour", { state: { tripId: nextTrip.id } })
                      }
                    >
                      <MapPinned size={18} /> Manage Tour
                    </button>
                  </div>
                </div>
              </div>
            </section>
          ) : (
            <section className={`${styles.card} ${styles.emptyCard}`}>
              <div className={styles.emptyIcon}>
                <Compass size={28} />
              </div>
              <h3>No Tours Created Yet</h3>
              <p>
                Start building your experience! Create your first tour, set available dates and
                pricing, and start welcoming travelers from around the world.
              </p>
              <button
                type="button"
                className={styles.createButtonHeader}
                onClick={() => navigate("/guide/createtour")}
              >
                <Plus size={18} /> Create Your First Tour
              </button>
            </section>
          )}

          {/* Stats Grid */}
          <section className={styles.statsGrid} aria-label="Guide statistics">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <article className={styles.statCard} key={stat.label}>
                  <span className={`${styles.statIcon} ${styles[stat.tone]}`}>
                    <Icon size={23} aria-hidden="true" />
                  </span>
                  <span className={styles.statContent}>
                    <small>{stat.label}</small>
                    <strong>{stat.value}</strong>
                    <em>{stat.helper}</em>
                  </span>
                </article>
              );
            })}
          </section>

          {/* Tours List */}
          <section className={`${styles.card} ${styles.toursCard}`}>
            <div className={styles.sectionHeader}>
              <h2>My Tours &amp; Experiences</h2>
              <SectionAction onClick={() => navigate("/guide")}>View all</SectionAction>
            </div>

            {loading ? (
              <div className={styles.loadingPlaceholder}>Loading your tours...</div>
            ) : tours.length === 0 ? (
              <div className={styles.emptyCard}>
                <p>You have not published any tours yet.</p>
                <button
                  type="button"
                  className={styles.primaryButton}
                  onClick={() => navigate("/guide/createtour")}
                >
                  <Plus size={18} /> Create New Trip
                </button>
              </div>
            ) : (
              <div className={styles.tourList}>
                {tours.map((trip) => (
                  <article className={styles.tourRow} key={trip.id}>
                    <img
                      src={resolveMediaUrl(trip.image) || defaultTourImage}
                      alt={trip.title}
                      aria-hidden="true"
                    />
                    <div className={styles.tourMain}>
                      <h3>{trip.title}</h3>
                      <span>
                        <MapPin size={13} /> {trip.location}
                      </span>
                      <div className={styles.mobileTourMeta}>
                        <span>{formatDateDisplay(trip.createdAt)}</span>
                        <span>•</span>
                        <span>{trip.duration}</span>
                      </div>
                    </div>
                    <div className={styles.desktopMeta}>
                      <small>Duration</small>
                      <strong>{trip.duration}</strong>
                    </div>
                    <div className={styles.desktopMeta}>
                      <small>Base price</small>
                      <strong>${trip.price}</strong>
                    </div>
                    <div className={styles.guestsMeta}>
                      <UsersRound size={16} />
                      <strong>Max {trip.groupSize}</strong>
                    </div>
                    <strong className={styles.earnings}>${trip.price}</strong>
                    <span
                      className={`${styles.statusBadge} ${
                        trip.status === "active"
                          ? styles.statusActive
                          : trip.status === "draft"
                            ? styles.statusDraft
                            : styles.statusReviewing
                      }`}
                    >
                      {trip.statusText || trip.status}
                    </span>
                    <button
                      type="button"
                      className={styles.rowAction}
                      aria-label={`Manage ${trip.title}`}
                      onClick={() =>
                        navigate("/guide/createtour", { state: { tripId: trip.id } })
                      }
                    >
                      <ChevronRight size={19} />
                    </button>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Sidebar */}
        <aside className={styles.sideColumn}>
          {/* Today's Schedule */}
          <section className={`${styles.card} ${styles.sideCard}`}>
            <div className={styles.sectionHeader}>
              <h2>Schedule</h2>
              <SectionAction onClick={() => navigate("/guide/calendar")}>
                Calendar
              </SectionAction>
            </div>

            {scheduleItems.length === 0 ? (
              <div className={styles.emptyTimeline}>
                <p>No trips scheduled for today.</p>
                <button
                  type="button"
                  className={styles.sectionAction}
                  onClick={() => navigate("/guide/calendar")}
                  style={{ marginTop: "8px" }}
                >
                  View calendar availability
                </button>
              </div>
            ) : (
              <div className={styles.timeline}>
                {scheduleItems.map((item, idx) => (
                  <article className={styles.timelineItem} key={`${item.time}-${idx}`}>
                    <span className={styles.timelineTime}>{item.time}</span>
                    <span className={styles.timelineDot} aria-hidden="true" />
                    <span className={styles.timelineText}>
                      <strong>{item.title}</strong>
                      <small>{item.location}</small>
                    </span>
                    <span className={styles.timelineGuests}>
                      <UsersRound size={15} /> {item.guests}
                    </span>
                  </article>
                ))}
              </div>
            )}
          </section>

          {/* Reminders & Alerts */}
          <section className={`${styles.card} ${styles.sideCard}`}>
            <div className={styles.sectionHeader}>
              <h2>Reminders &amp; Alerts</h2>
            </div>
            <div className={styles.compactList}>
              {reminders.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    type="button"
                    className={styles.compactItem}
                    key={item.title}
                    onClick={() => item.link && navigate(item.link)}
                  >
                    <span className={`${styles.compactIcon} ${styles[item.tone]}`}>
                      <Icon size={18} />
                    </span>
                    <span>
                      <strong>{item.title}</strong>
                      <small>{item.helper}</small>
                    </span>
                    <ChevronRight size={18} />
                  </button>
                );
              })}
            </div>
          </section>

          {/* Latest Activity */}
          <section className={`${styles.card} ${styles.sideCard}`}>
            <div className={styles.sectionHeader}>
              <h2>Latest Activity</h2>
            </div>
            {activities.length === 0 ? (
              <p className={styles.emptyCompact}>No recent activity yet.</p>
            ) : (
              <div className={styles.compactList}>
                {activities.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div className={styles.activityItem} key={`${item.title}-${idx}`}>
                      <span className={`${styles.compactIcon} ${styles[item.tone]}`}>
                        <Icon size={18} />
                      </span>
                      <span>
                        <strong>{item.title}</strong>
                        <small>{item.helper}</small>
                      </span>
                      <time>{item.time}</time>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </aside>
      </div>
    </div>
  );
}
