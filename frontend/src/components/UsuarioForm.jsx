import { useEffect, useState } from "react";

export default function EjercicioForm({ onSubmit, initialData, onCancel }) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [parteCuerpo, setParteCuerpo] = useState("");
  const [elemento, setElemento] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (initialData) {
      setNombre(initialData.nombre || "");
      setDescripcion(initialData.descripcion || "");
      setParteCuerpo(initialData.parteCuerpo || "");
      setElemento(initialData.elemento || "");
      setImageUrl(initialData.imageUrl || "");
    } else {
      limpiarFormulario();
    }
  }, [initialData]);

  function limpiarFormulario() {
    setNombre("");
    setDescripcion("");
    setParteCuerpo("");
    setElemento("");
    setImageUrl("");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const mensaje = initialData
      ? "¿Confirmar modificación del ejercicio?"
      : "¿Confirmar creación del ejercicio?";

    if (!window.confirm(mensaje)) return;

    await onSubmit({
      nombre,
      descripcion,
      parteCuerpo,
      elemento,
      imageUrl
    });

    limpiarFormulario();
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
      />

      <textarea
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />

      <input
        placeholder="Parte del cuerpo"
        value={parteCuerpo}
        onChange={(e) => setParteCuerpo(e.target.value)}
      />

      <input
        placeholder="Elemento usado (opcional)"
        value={elemento}
        onChange={(e) => setElemento(e.target.value)}
      />

      <input
        placeholder="URL de imagen (opcional)"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />

      <div style={{ display: "flex", gap: 10 }}>
        <button type="submit">
          {initialData ? "Guardar Cambios" : "Crear Ejercicio"}
        </button>

        {initialData && (
          <button
            type="button"
            onClick={onCancel}
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
