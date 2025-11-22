import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const user = await login(nombre, password);
      console.log("Login response:", user);

      setNombre("");
      setPassword("");

      // Redirección + refresh PROLIJA y SIN romper nada del proyecto
      window.location.href = `/${user.rol}`;
      return;

    } catch (err) {
      setError(err.response?.data?.error || "Error de login");
    }
  }

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "url('/src/images/fondo.png') center/cover fixed"
      }}
    >
      <div
        style={{
          background: "rgba(255,255,255,0.9)",
          padding: "2rem 3rem",
          borderRadius: "12px",
          textAlign: "center",
          width: "300px"
        }}
      >
        <h2 style={{ color: "#0C3264", marginBottom: "1.5rem" }}>Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            style={{
              width: "100%",
              padding: "0.6rem",
              marginBottom: "0.5rem",
              borderRadius: "6px",
              border: "1px solid #ccc"
            }}
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "0.6rem",
              marginBottom: "0.5rem",
              borderRadius: "6px",
              border: "1px solid #ccc"
            }}
          />

          {error && (
            <p style={{ color: "red", marginBottom: "0.5rem" }}>{error}</p>
          )}

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "0.8rem",
              backgroundColor: "#05A3CB",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}
