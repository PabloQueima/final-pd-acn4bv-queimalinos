import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../services/authService";

export default function NavBar() {
  const user = getCurrentUser();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <nav style={{ marginBottom: 20 }}>
      {user ? (
        <>
          {user.rol === "admin" && (
            <Link to="/admin" style={{ marginRight: 10 }}>
              Usuarios
            </Link>
          )}

          {user.rol === "entrenador" && (
            <Link to="/entrenador" style={{ marginRight: 10 }}>
              Sesiones
            </Link>
          )}

          {user.rol === "cliente" && (
            <Link to="/cliente" style={{ marginRight: 10 }}>
              Mis Sesiones
            </Link>
          )}

          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
}
