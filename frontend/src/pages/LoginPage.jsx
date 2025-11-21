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

      if (user.rol === "admin") navigate("/admin");
      else if (user.rol === "entrenador") navigate("/entrenador");
      else navigate("/cliente");
    } catch (err) {
      setError(err.response?.data?.error || "Error de login");
    }
  }

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}
