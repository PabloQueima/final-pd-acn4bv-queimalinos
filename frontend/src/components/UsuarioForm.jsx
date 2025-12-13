import { useEffect, useState } from "react";

export default function UsuarioForm({ onSubmit, initialData = null }) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [rol, setRol] = useState("cliente");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData) {
      setNombre(initialData.nombre || "");
      setEmail(initialData.email || "");
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

    if (!email.trim()) {
      setError("El email es obligatorio.");
      return;
    }

    if (!initialData && !password.trim()) {
      setError("La contraseña es obligatoria.");
      return;
    }

    try {
      await onSubmit({
        nombre,
        email,
        rol,
        ...(password.trim() ? { password } : {})
      });

      if (!initialData) {
        setNombre("");
        setEmail("");
        setRol("cliente");
        setPassword("");
      }
    } catch (err) {
      setError(err.message || "Error al guardar usuario");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ marginBottom: 20, display: "flex", flexDirection: "column", gap: 10 }}
    >
      <input
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <select value={rol} onChange={(e) => setRol(e.target.value)}>
        <option value="admin">admin</option>
        <option value="entrenador">entrenador</option>
        <option value="cliente">cliente</option>
      </select>

      <input
        type="password"
        placeholder={initialData ? "Nueva contraseña (opcional)" : "Contraseña"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit">
        {initialData ? "Guardar Cambios" : "Crear Usuario"}
      </button>
    </form>
  );
}
