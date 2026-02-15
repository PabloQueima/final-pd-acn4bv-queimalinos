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

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore();

    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const userRef = doc(db, "usuarios", firebaseUser.uid);

        let snap = null;
        let attempts = 0;

        while (attempts < 6) {
          snap = await getDoc(userRef);
          if (snap.exists()) break;

          await new Promise(res => setTimeout(res, 300));
          attempts++;
        }

        if (!snap || !snap.exists()) {
          console.error("Documento de usuario no encontrado en Firestore");
          setUser(null);
          setLoading(false);
          return;
        }

        setUser({
          uid: firebaseUser.uid,
          ...snap.data()
        });

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
