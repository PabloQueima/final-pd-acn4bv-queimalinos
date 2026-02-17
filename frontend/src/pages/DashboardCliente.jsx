import MisSesionesPage from "./MisSesionesPage";
import fondo from "../images/fondo.png";

export default function DashboardCliente() {
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
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <MisSesionesPage />
      </div>
    </div>
  );
}
