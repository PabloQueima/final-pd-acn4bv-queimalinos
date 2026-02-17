import SesionesPage from "./SesionesPage";
import fondo from "../images/fondo.png";

export default function DashboardEntrenador() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${fondo})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        padding: 20,
      }}
    >
      <div style={{ maxWidth: "1600px", margin: "0 auto" }}>
        <h1 style={{ color: "#fff", marginBottom: 20 }}>
          Panel Entrenador
        </h1>

        <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
          <div
            style={{
              flex: 1,
              background: "rgba(255,255,255,0.95)",
              padding: 20,
              borderRadius: 8,
              boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
            }}
          >
            <SesionesPage />
          </div>
        </div>
      </div>
    </div>
  );
}
