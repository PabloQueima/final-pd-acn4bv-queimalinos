import { useState } from "react";
import { login } from "../services/authService";
import fondo from "../images/fondo.png";
import logo from "../images/logo.png";

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  function validate() {
    const newErrors = {};

    if (!form.email) {
      newErrors.email = "El email es obligatorio";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Formato de email inválido";
    }

    if (!form.password) {
      newErrors.password = "La contraseña es obligatoria";
    } else if (form.password.length < 6) {
      newErrors.password = "Mínimo 6 caracteres";
    }

    return newErrors;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      setLoading(true);
      await login(form.email, form.password);
    } catch {
      setErrors({ general: "Credenciales inválidas" });
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: `url(${fondo}) center/cover fixed`,
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
          src={logo}
          alt="Logo"
          style={{ width: "110px", marginBottom: "1.2rem" }}
        />

        <h2 style={{ color: "#0C3264", marginBottom: "1.8rem" }}>
          Login
        </h2>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}
        >
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <small style={{ color: "red" }}>{errors.email}</small>}

          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
          />
          {errors.password && <small style={{ color: "red" }}>{errors.password}</small>}

          {errors.general && (
            <div style={{ color: "red", fontSize: "0.9rem" }}>
              {errors.general}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "0.85rem",
              backgroundColor: "#05A3CB",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontWeight: "600",
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
}
