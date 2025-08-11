import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/Profile.module.css";

const API = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});


type User = {
  name: string;
  email: string;
};

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const getUserData = async () => {
      let res = await API.get("users/profile");
      setUser(res.data)
    };
    getUserData();
  }, []);
console.log(user);

  const handleLogout = async () => {
    await API.post("/auth/logout");
    window.location.href = "/login";
  };
  return (
    <div className={styles.profileContainer}>
      <img
        src={"https://i.pravatar.cc/150?img=12"}
        alt="User Avatar"
        className={styles.avatar}
      />
      <h1 className={styles.userName}>{user?.name}</h1>
      <p className={styles.userEmail}>{user?.email}</p>

      <div>
        <div className={styles.infoLabel}>Full Name</div>
        <div className={styles.infoValue}>{user?.name}</div>

        <div className={styles.infoLabel}>Email Address</div>
        <div className={styles.infoValue}>{user?.email}</div>
      </div>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
