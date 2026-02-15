import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

import "./styles/styles.css";

import DashboardAdmin from "./pages/DashboardAdmin";
import DashboardEntrenador from "./pages/DashboardEntrenador";
import DashboardCliente from "./pages/DashboardCliente";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import { getCurrentUser } from "./services/authService";

export default function App() {
  const [user, setUser] = useState(getCurrentUser());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore();

    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        localStorage.removeItem("user");
        setLoading(false);
        return;
      }

      try {
        const snap = await getDoc(doc(db, "usuarios", firebaseUser.uid));

        if (!snap.exists()) {
          setUser(null);
          setLoading(false);
          return;
        }

        const userData = {
          uid: firebaseUser.uid,
          ...snap.data()
        };

        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        setLoading(false);

      } catch (error) {
        console.error("Error obteniendo usuario:", error);
        setUser(null);
        setLoading(false);
      }
    });

    return () => unsub();
  }, []);

  if (loading) return null;

  return (
    <>
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
          path="/register"
          element={
            user
              ? <Navigate to={`/${user.rol}`} replace />
              : <RegisterPage />
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
