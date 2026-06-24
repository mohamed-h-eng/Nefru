import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "../../../../store/slices/authSlice";
import ProfileSidebar from "./components/ProfileSidebar";
import ProfileOverview from "./components/ProfileOverview";
import styles from "./DesktopProfile.module.css";

export default function DesktopProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("overview");

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth/login", { replace: true });
  };

  return (
    <main className={styles.page}>
      <ProfileSidebar
        activeSection={activeSection}
        onChangeSection={setActiveSection}
        onLogout={handleLogout}
      />

      <section className={styles.content}>
        {activeSection === "overview" && <ProfileOverview />}

        {activeSection === "bookings" && (
          <div className={styles.placeholder}>
            <h2>My Bookings</h2>
            <p>Booking list will be connected after the booking module is ready.</p>
          </div>
        )}

        {activeSection === "payments" && (
          <div className={styles.placeholder}>
            <h2>Payment Methods</h2>
            <p>Payment methods will be connected after the payment flow is ready.</p>
          </div>
        )}

        {activeSection === "reviews" && (
          <div className={styles.placeholder}>
            <h2>Reviews Written</h2>
            <p>Tourist reviews will be connected after the reviews module is ready.</p>
          </div>
        )}

        {activeSection === "support" && (
          <div className={styles.placeholder}>
            <h2>Help & Support</h2>
            <p>Support content and FAQs will be added later.</p>
          </div>
        )}
      </section>
    </main>
  );
}
