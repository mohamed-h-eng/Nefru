import { useSelector } from "react-redux";
import {
  FiCalendar,
  FiCreditCard,
  FiHeadphones,
  FiLogOut,
  FiStar,
  FiUser,
} from "react-icons/fi";

import styles from "./ProfileSidebar.module.css";

const menuItems = [
  { id: "overview", label: "Profile Overview", icon: FiUser },
  { id: "bookings", label: "My Bookings", icon: FiCalendar },
  { id: "payments", label: "Payment Methods", icon: FiCreditCard },
  { id: "reviews", label: "Reviews Written", icon: FiStar },
  { id: "support", label: "Help & Support", icon: FiHeadphones },
];

function getInitials(fullName = "User") {
  return fullName
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function ProfileSidebar({ activeSection, onChangeSection, onLogout }) {
  const { user } = useSelector((state) => state.auth);
  const fullName = user?.fullName || "Nefru Traveler";
  const email = user?.email || "traveler@nefru.com";

  return (
    <aside className={styles.sidebar}>
      <div className={styles.summaryCard}>
        <div className={styles.avatar}>{getInitials(fullName)}</div>
        <div>
          <h2>{fullName}</h2>
          <p>{email}</p>
        </div>

        <div className={styles.progressBlock}>
          <div className={styles.progressHeader}>
            <span>Profile Completion</span>
            <strong>60%</strong>
          </div>
          <div className={styles.progressTrack}>
            <span />
          </div>
        </div>
      </div>

      <nav className={styles.navCard} aria-label="Profile navigation">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              type="button"
              className={`${styles.navItem} ${isActive ? styles.navItemActive : ""}`}
              onClick={() => onChangeSection(item.id)}
            >
              <Icon />
              <span>{item.label}</span>
            </button>
          );
        })}

        <button type="button" className={styles.navItem} onClick={onLogout}>
          <FiLogOut />
          <span>Logout</span>
        </button>
      </nav>
    </aside>
  );
}
