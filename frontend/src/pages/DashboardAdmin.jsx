import UsuariosPage from "./UsuariosPage";
import { useEffect, useState } from "react";
import { getUsuarios, getSesionesAll, getEjercicios } from "../services/api";
import EjerciciosPage from "./EjerciciosPage";

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
    const [u, s, e] = await Promise.all([
      getUsuarios(),
      getSesionesAll(),
      getEjercicios(),
    ]);

    setTotales({
      usuarios: u.length,
      sesiones: s.length,
      ejercicios: e.length,
    });
  }

  return (
    <div
      style={{
        maxWidth: "2400px",
        margin: "0 auto",
        padding: "20px"
      }}
    >
      <h1 style={{ marginBottom: 10 }}>Panel Administrador</h1>

      <div
        style={{
          marginBottom: 30,
          background: "#fff",
          padding: "15px 20px",
          borderRadius: 8,
          boxShadow: "0 2px 6px rgba(0,0,0,0.08)"
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
          gridTemplateColumns: "1fr 1fr",
          gap: "25px",
          alignItems: "flex-start"
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: 10,
            borderRadius: 8,
            boxShadow: "0 2px 6px rgba(0,0,0,0.06)"
          }}
        >
          <h2 style={{ marginBottom: 15 }}>Gestión de Ejercicios</h2>
          <EjerciciosPage />
        </div>

        <div
          style={{
            background: "#fff",
            padding: 20,
            borderRadius: 8,
            boxShadow: "0 2px 6px rgba(0,0,0,0.06)"
          }}
        >
          <h2 style={{ marginBottom: 15 }}>Gestión de Usuarios</h2>
          <UsuariosPage />
        </div>
      </div>
    </div>
  );
}
