// src/components/ProtectedRoute.tsx
import { JSX, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000", withCredentials: true });

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await API.get("/auth/check"); 
        setIsAuth(true);
      } catch (error) {
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!isAuth) return <Navigate to="/login" />;

  return children;
}
