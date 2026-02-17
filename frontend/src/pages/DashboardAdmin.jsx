import UsuariosPage from "./UsuariosPage";
import { useEffect, useState } from "react";
import { getUsuarios, getSesiones, getEjercicios } from "../services/api";
import EjerciciosPage from "./EjerciciosPage";
import fondo from "../images/fondo.png";

export default function DashboardAdmin() {
  const [totales, setTotales] = useState({
    usuarios: 0,
    sesiones: 0,
    ejercicios: 0,
  });

  useEffect(() => {
    cargarTotales();
  }, []);

  async function cargarTotales() {
    try {
      const [u, s, e] = await Promise.all([
        getUsuarios(),
        getSesiones(),
        getEjercicios(),
      ]);

      const usuarios = Array.isArray(u) ? u : [];
      const sesiones = Array.isArray(s) ? s : [];
      const ejercicios = Array.isArray(e) ? e : [];

      setTotales({
        usuarios: usuarios.length,
        sesiones: sesiones.length,
        ejercicios: ejercicios.length,
      });
    } catch (err) {
      console.error("Error cargando totales:", err);
      setTotales({ usuarios: 0, sesiones: 0, ejercicios: 0 });
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${fondo})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        padding: "20px",
      }}
    >
      <div style={{ maxWidth: "2400px", margin: "0 auto" }}>
        <h1 style={{ marginBottom: 10, color: "#fff" }}>
          Panel Administrador
        </h1>

        <div
          style={{
            marginBottom: 30,
            background: "rgba(255,255,255,0.95)",
            padding: "15px 20px",
            borderRadius: 8,
            boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
          }}
        >
          <h3 style={{ marginBottom: 10 }}>Métricas generales</h3>
          <p>Total usuarios: {totales.usuarios}</p>
          <p>Total sesiones: {totales.sesiones}</p>
          <p>Total ejercicios: {totales.ejercicios}</p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "6.5fr 3.5fr",
            gap: "25px",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.95)",
              padding: 10,
              borderRadius: 8,
              boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
            }}
          >
            <h2 style={{ marginBottom: 15 }}>
              Gestión de Ejercicios
            </h2>
            <EjerciciosPage onEjerciciosChange={cargarTotales} />
          </div>

          <div
            style={{
              background: "rgba(255,255,255,0.95)",
              padding: 20,
              borderRadius: 8,
              boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
            }}
          >
            <h2 style={{ marginBottom: 15 }}>
              Gestión de Usuarios
            </h2>
            <UsuariosPage onUsuariosChange={cargarTotales} />
          </div>
        </div>
      </div>
    </div>
  );
}
