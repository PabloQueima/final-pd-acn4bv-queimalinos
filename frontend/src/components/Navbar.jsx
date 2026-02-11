import { getCurrentUser, logout } from "../services/authService";

export default function Navbar() {
  const user = getCurrentUser();

  if (!user) return null;

  return (
    <nav
      style={{
        padding: "15px 25px",
        background: "#15114D",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 30
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
        <img
          src="/src/images/logo.png"
          alt="Logo"
          style={{ width: 40, height: 40, borderRadius: 4 }}
        />

        <strong>
          {user.nombre} – {user.rol.toUpperCase()}
        </strong>
      </div>

      <button
        onClick={() => {
          logout();
          location.href = "/";
        }}
        style={{
          background: "#05A3CB",
          color: "white",
          border: "none",
          padding: "8px 14px",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "bold"
        }}
      >
        Cerrar sesión
      </button>
    </nav>
  );
}
