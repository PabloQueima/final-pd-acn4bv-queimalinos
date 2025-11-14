import { useState } from "react";

export default function EjercicioForm({ onSubmit }) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!nombre.trim() || !descripcion.trim()) return;

    onSubmit({ nombre, descripcion });
    setNombre("");
    setDescripcion("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <input
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />
      <button type="submit">Agregar</button>
    </form>
  );
}
