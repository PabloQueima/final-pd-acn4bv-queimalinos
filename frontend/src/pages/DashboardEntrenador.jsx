import SesionesPage from "./SesionesPage";
import EjerciciosPage from "./EjerciciosPage";

export default function DashboardEntrenador() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Panel Entrenador</h1>

      <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
        <div style={{ flex: 1 }}>
          <h2>Gestión de Ejercicios</h2>
          <EjerciciosPage />
        </div>

        <div style={{ flex: 2 }}>
          <h2>Gestión de Sesiones</h2>
          <SesionesPage />
        </div>
      </div>
    </div>
  );
}
