import { useState } from "react";
import { register } from "../services/authService";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      setLoading(true);

      await register(nombre, email, password);

      // Redirigir directamente al panel cliente
      navigate("/cliente", { replace: true });

    } catch (err) {
      setError("Error al registrarse");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "url('/src/images/fondo.png') center/cover fixed",
        padding: "1rem"
      }}
    >
      <div
        style={{
          background: "rgba(255,255,255,0.95)",
          padding: "2.5rem",
          borderRadius: "14px",
          width: "320px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
          textAlign: "center"
        }}
      >
        <img
          src="/src/images/logo.png"
          alt="Logo"
          style={{ width: "110px", marginBottom: "1.2rem" }}
        />

        <h2
          style={{
            color: "#0C3264",
            marginBottom: "1.8rem",
            fontWeight: "600"
          }}
        >
          Registrarse
        </h2>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.9rem"
          }}
        >
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Reescriba la contraseña"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />

          {error && (
            <div
              style={{
                backgroundColor: "#ffe6e6",
                color: "#cc0000",
                padding: "0.6rem",
                borderRadius: "6px",
                fontSize: "0.85rem"
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: "0.5rem",
              padding: "0.85rem",
              backgroundColor: "#05A3CB",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontWeight: "600",
              cursor: "pointer",
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? "Creando..." : "Crear cuenta"}
          </button>
        </form>
      </div>
    </div>
  );
}
