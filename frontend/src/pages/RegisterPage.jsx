import { useState } from "react";
import { register } from "../services/authService";
import { useNavigate } from "react-router-dom";
import fondo from "../images/fondo.png";
import logo from "../images/logo.png";

export default function RegisterPage() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function validate() {
    const newErrors = {};

    if (!form.nombre || form.nombre.trim().length < 3) {
      newErrors.nombre = "El nombre debe tener al menos 3 caracteres";
    }

    if (!form.email) {
      newErrors.email = "El email es obligatorio";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Formato de email inválido";
    }

    if (!form.password) {
      newErrors.password = "La contraseña es obligatoria";
    } else if (form.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Debe confirmar la contraseña";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    return newErrors;
  }

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setGeneralError("");

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      setLoading(true);
      await register(form.nombre, form.email, form.password);
      navigate("/login", { replace: true });
    } catch {
      setGeneralError("Error al registrarse");
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
          <div>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={form.nombre}
              onChange={handleChange}
            />
            {errors.nombre && (
              <small style={{ color: "red" }}>{errors.nombre}</small>
            )}
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && (
              <small style={{ color: "red" }}>{errors.email}</small>
            )}
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={form.password}
              onChange={handleChange}
            />
            {errors.password && (
              <small style={{ color: "red" }}>{errors.password}</small>
            )}
          </div>

          <div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Reescriba la contraseña"
              value={form.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <small style={{ color: "red" }}>
                {errors.confirmPassword}
              </small>
            )}
          </div>

          {generalError && (
            <div
              style={{
                backgroundColor: "#ffe6e6",
                color: "#cc0000",
                padding: "0.6rem",
                borderRadius: "6px",
                fontSize: "0.85rem"
              }}
            >
              {generalError}
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
