import { useState } from "react";
import { login } from "../services/authService";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
    } catch {
      setError("Credenciales inválidas");
    }
  }

  return (
    <div
      style={{
        height: "90vh",
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
        <img
          src="/src/images/logo.png"
          alt="Logo"
          style={{ width: "120px", marginBottom: "1rem" }}
        />

        <h2 style={{ color: "#0C3264", marginBottom: "1.5rem" }}>
          Login
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
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
            onChange={e => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "0.6rem",
              marginBottom: "0.5rem",
              borderRadius: "6px",
              border: "1px solid #ccc"
            }}
          />

          {error && <p style={{ color: "red" }}>{error}</p>}

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
