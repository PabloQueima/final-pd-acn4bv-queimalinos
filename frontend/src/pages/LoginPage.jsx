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
          Login
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
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{
              padding: "0.7rem",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "0.95rem"
            }}
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{
              padding: "0.7rem",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "0.95rem"
            }}
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
            style={{
              marginTop: "0.5rem",
              padding: "0.85rem",
              backgroundColor: "#05A3CB",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "0.2s"
            }}
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}
