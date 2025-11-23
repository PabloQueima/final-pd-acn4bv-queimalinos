import { useState, useEffect } from "react";

export default function UsuarioForm({ onSubmit, initialData = null }) {
  const [nombre, setNombre] = useState("");
  const [rol, setRol] = useState("cliente");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData) {
      setNombre(initialData.nombre || "");
      setRol(initialData.rol || "cliente");
      setPassword("");
    }
  }, [initialData]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!nombre.trim()) {
      setError("El nombre es obligatorio.");
      return;
    }

    if (!initialData && !password.trim()) {
      setError("La contraseña es obligatoria al crear usuario.");
      return;
    }

    try {
      await onSubmit({
        nombre,
        rol,
        ...(password.trim() ? { password } : {})
      });

      if (!initialData) {
        setNombre("");
        setRol("cliente");
        setPassword("");
      }
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20, display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ display: "block" }}>
        <input
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          style={{ width: "250px", padding: 6 }}
        />
      </div>

      <div style={{ display: "block" }}>
        <select
          value={rol}
          onChange={(e) => setRol(e.target.value)}
          style={{ width: "250px", padding: 6 }}
        >
          <option value="admin">admin</option>
          <option value="entrenador">entrenador</option>
          <option value="cliente">cliente</option>
        </select>
      </div>

      <div style={{ display: "block" }}>
        <input
          placeholder={initialData ? "Nueva contraseña (opcional)" : "Contraseña"}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "250px", padding: 6 }}
        />
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit" style={{ width: "150px", padding: 8 }}>
        {initialData ? "Guardar Cambios" : "Crear Usuario"}
      </button>
    </form>
  );
}
