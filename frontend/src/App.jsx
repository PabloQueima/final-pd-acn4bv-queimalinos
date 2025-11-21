import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import "./styles/styles.css";

import DashboardAdmin from "./pages/DashboardAdmin";
import DashboardEntrenador from "./pages/DashboardEntrenador";
import DashboardCliente from "./pages/DashboardCliente";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";

import Navbar from "./components/Navbar";
import { getCurrentUser } from "./services/authService";

export default function App() {
  const [currentUser, setCurrentUser] = useState(getCurrentUser());

  useEffect(() => {
    // Observa si el usuario cambia en localStorage (cuando haces login)
    const interval = setInterval(() => {
      const stored = getCurrentUser();
      setCurrentUser(stored);
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/admin"
          element={
            currentUser?.rol === "admin"
              ? <DashboardAdmin />
              : <Navigate to="/login" />
          }
        />

        <Route
          path="/entrenador"
          element={
            currentUser?.rol === "entrenador"
              ? <DashboardEntrenador />
              : <Navigate to="/login" />
          }
        />

        <Route
          path="/cliente"
          element={
            currentUser?.rol === "cliente"
              ? <DashboardCliente />
              : <Navigate to="/login" />
          }
        />
      </Routes>
    </>
  );
}
