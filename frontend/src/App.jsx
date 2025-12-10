import { Routes, Route, Navigate } from "react-router-dom";

import "./styles/styles.css";

import DashboardAdmin from "./pages/DashboardAdmin";
import DashboardEntrenador from "./pages/DashboardEntrenador";
import DashboardCliente from "./pages/DashboardCliente";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; // <- agregado
import { getCurrentUser } from "./services/authService";

export default function App() {
  const user = getCurrentUser(); // siempre se lee actualizado

  return (
    <>
      {/* Navbar solo si hay usuario */}
      {user && <Navbar />}

      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route
          path="/login"
          element={
            user
              ? <Navigate to={`/${user.rol}`} replace />
              : <LoginPage />
          }
        />

        <Route
          path="/admin"
          element={
            user?.rol === "admin"
              ? <DashboardAdmin />
              : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/entrenador"
          element={
            user?.rol === "entrenador"
              ? <DashboardEntrenador />
              : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/cliente"
          element={
            user?.rol === "cliente"
              ? <DashboardCliente />
              : <Navigate to="/login" replace />
          }
        />
      </Routes>
      <Footer />
    </>
  );
}
