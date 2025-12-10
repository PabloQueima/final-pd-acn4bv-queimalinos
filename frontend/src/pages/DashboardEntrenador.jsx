import SesionesPage from "./SesionesPage";
import EjerciciosPage from "./EjerciciosPage";

export default function DashboardEntrenador() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Panel Entrenador</h1>

      <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
        <div style={{ flex: 1 }}>
          <SesionesPage />
        </div>
      </div>
    </div>
  );
}
