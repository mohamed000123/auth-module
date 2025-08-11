import { useState, useEffect } from "react";
import { API } from "../config.ts";
import styles from "../styles/Profile.module.css";
import { useNavigate } from "react-router-dom";

type User = {
  name: string;
  email: string;
};

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const getUserData = async () => {
      let res = await API.get("users/profile");
      setUser(res.data)
    };
    getUserData();
  }, []);

  const handleLogout = async () => {
    await API.post("/auth/logout");
    navigate("/login");
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
