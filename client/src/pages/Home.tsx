import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000", withCredentials: true });

export default function Home() {
  const handleLogout = async () => {
    await API.post("/auth/logout"); 
    window.location.href = "/login";
  };

  return (
    <div>
      <h1>Welcome to the application.</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
