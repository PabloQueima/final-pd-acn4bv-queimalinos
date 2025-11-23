import { useEffect, useState } from "react";

export default function EjercicioForm({ onSubmit, initialData }) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [parteCuerpo, setParteCuerpo] = useState("");
  const [elemento, setElemento] = useState("");

  useEffect(() => {
    if (initialData) {
      setNombre(initialData.nombre || "");
      setDescripcion(initialData.descripcion || "");
      setParteCuerpo(initialData.parteCuerpo || "");
      setElemento(initialData.elemento || "");
    }
  }, [initialData]);

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit({
      nombre,
      descripcion,
      parteCuerpo,
      elemento
    });

    if (!initialData) {
      setNombre("");
      setDescripcion("");
      setParteCuerpo("");
      setElemento("");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        padding: 15,
        border: "1px solid #ccc",
        marginBottom: 20,
        display: "flex",
        flexDirection: "column",
        gap: 10
      }}
    >
      <input
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        style={{ padding: 6 }}
      />

      <textarea
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        style={{ padding: 6 }}
      />

      <input
        placeholder="Parte del cuerpo"
        value={parteCuerpo}
        onChange={(e) => setParteCuerpo(e.target.value)}
        style={{ padding: 6 }}
      />

      <input
        placeholder="Elemento usado (opcional)"
        value={elemento}
        onChange={(e) => setElemento(e.target.value)}
        style={{ padding: 6 }}
      />

      <button type="submit" style={{ marginTop: 10 }}>
        {initialData ? "Guardar Cambios" : "Crear Ejercicio"}
      </button>
    </form>
  );
}
