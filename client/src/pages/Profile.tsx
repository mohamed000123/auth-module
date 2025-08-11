import axios from "axios";
import styles from "../styles/Profile.module.css";

const API = axios.create({ baseURL: "http://localhost:5000", withCredentials: true });

type UserProfile = {
  name: string;
  email: string;
  avatarUrl?: string;
};

const dummyUser: UserProfile = {
  name: "Mohamed Amin",
  email: "mohamed.amin@example.com",
  avatarUrl: "https://i.pravatar.cc/150?img=12", // صورة افتراضية من pravatar
};

export default function Profile() {
  const user = dummyUser; // ممكن تجيب بيانات اليوزر من API أو Context
  const handleLogout = async () => {
    await API.post("/auth/logout"); 
    window.location.href = "/login";
  };
  return (
    <div className={styles.profileContainer}>
      <img
        src={user.avatarUrl || "https://via.placeholder.com/120"}
        alt="User Avatar"
        className={styles.avatar}
      />
      <h1 className={styles.userName}>{user.name}</h1>
      <p className={styles.userEmail}>{user.email}</p>

      <div>
        <div className={styles.infoLabel}>Full Name</div>
        <div className={styles.infoValue}>{user.name}</div>

        <div className={styles.infoLabel}>Email Address</div>
        <div className={styles.infoValue}>{user.email}</div>
      </div>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
