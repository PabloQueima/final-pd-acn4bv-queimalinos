import { useState, useEffect } from "react";

export default function UsuarioForm({ onSubmit, initialData = null }) {
  const [nombre, setNombre] = useState("");
  const [rol, setRol] = useState("cliente");
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData) {
      setNombre(initialData.nombre || "");
      setRol(initialData.rol || "cliente");
    }
  }, [initialData]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!nombre.trim()) {
      setError("El nombre es obligatorio.");
      return;
    }

    try {
      await onSubmit({ nombre, rol });
      if (!initialData) {
        setNombre("");
        setRol("cliente");
      }
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <div>
        <input
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>

      <div>
        <select value={rol} onChange={(e) => setRol(e.target.value)}>
          <option value="admin">admin</option>
          <option value="entrenador">entrenador</option>
          <option value="cliente">cliente</option>
        </select>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit">
        {initialData ? "Guardar Cambios" : "Crear Usuario"}
      </button>
    </form>
  );
}
