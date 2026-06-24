import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  FiCalendar,
  FiCreditCard,
  FiEdit2,
  FiHeadphones,
  FiLogOut,
  FiStar,
} from "react-icons/fi";

import { logout } from "../../../../store/slices/authSlice";
import styles from "./MobileProfile.module.css";

function getInitials(fullName = "Traveler") {
  return fullName
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function MobileProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const fullName = user?.fullName || "Nefru Traveler";
  const email = user?.email || "traveler@nefru.com";
  const initials = useMemo(() => getInitials(fullName), [fullName]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth/login", { replace: true });
  };

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <button type="button" onClick={() => navigate("/user/home")} aria-label="Back">
          ‹
        </button>
        <h1>Tourist Profile</h1>
        <button type="button" aria-label="Edit profile">
          <FiEdit2 />
        </button>
      </header>

      <section className={styles.profileCard}>
        {user?.avatar ? <img src={user.avatar} alt={fullName} /> : <div className={styles.avatar}>{initials}</div>}
        <h2>{fullName}</h2>
        <p>{email}</p>
        <span>Traveler</span>
      </section>

      <section className={styles.menuSection}>
        <h3>Account Activities</h3>

        <button type="button" className={styles.menuItem}>
          <FiCalendar />
          <span>
            <strong>My Bookings</strong>
            <small>Upcoming trips</small>
          </span>
          <b>›</b>
        </button>

        <button type="button" className={styles.menuItem}>
          <FiCreditCard />
          <span>
            <strong>Payment Methods</strong>
            <small>Cards and payment options</small>
          </span>
          <b>›</b>
        </button>

        <button type="button" className={styles.menuItem}>
          <FiStar />
          <span>
            <strong>Reviews Written</strong>
            <small>Your tour feedback</small>
          </span>
          <b>›</b>
        </button>
      </section>

      <section className={styles.menuSection}>
        <h3>Support</h3>
        <button type="button" className={styles.menuItem}>
          <FiHeadphones />
          <span>
            <strong>Help & Support</strong>
            <small>FAQs and support</small>
          </span>
          <b>›</b>
        </button>
      </section>

      <button type="button" className={styles.logoutButton} onClick={handleLogout}>
        <FiLogOut />
        Log Out
      </button>
    </main>
  );
}
