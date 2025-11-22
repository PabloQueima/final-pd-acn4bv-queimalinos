import { useEffect, useState } from "react";
import { getUsuarios, getEjercicios } from "../services/api";
import EjercicioSelector from "./EjercicioSelector";

export default function SesionForm({ onSubmit, initialData = null }) {
  const [titulo, setTitulo] = useState("");
  const [clienteId, setClienteId] = useState("");
  const [entrenadorId, setEntrenadorId] = useState("");
  const [ejercicios, setEjercicios] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [todosEjercicios, setTodosEjercicios] = useState([]);

  const [error, setError] = useState("");

  useEffect(() => {
    cargarUsuarios();
    cargarEjerciciosBase();
  }, []);

  useEffect(() => {
    if (initialData) {
      setTitulo(initialData.titulo || "");
      setClienteId(initialData.clienteId || "");
      setEntrenadorId(initialData.entrenadorId || "");
      setEjercicios(initialData.ejercicios || []);
    }
  }, [initialData]);

  async function cargarUsuarios() {
    const data = await getUsuarios();
    setUsuarios(data);
  }

  async function cargarEjerciciosBase() {
    const data = await getEjercicios();
    setTodosEjercicios(data);
  }

  const clientes = usuarios.filter((u) => u.rol === "cliente");
  const entrenadores = usuarios.filter((u) => u.rol === "entrenador");

  function handleAddEjercicio(item) {
    const exists = ejercicios.find((e) => e.id === item.id);
    if (exists) {
      setEjercicios(ejercicios.map((e) => (e.id === item.id ? item : e)));
    } else {
      setEjercicios([...ejercicios, item]);
    }
  }

  function removeEjercicio(id) {
    setEjercicios(ejercicios.filter((e) => e.id !== id));
  }

  function getNombreEjercicio(id) {
    const ej = todosEjercicios.find((e) => e.id === id);
    return ej ? ej.nombre : `Ejercicio ${id}`;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!titulo.trim()) {
      setError("El título es obligatorio.");
      return;
    }
    if (!clienteId) {
      setError("Debe seleccionar un cliente.");
      return;
    }

    const payload = {
      titulo,
      clienteId,
      entrenadorId: entrenadorId || null,
      ejercicios: ejercicios,
    };

    try {
      await onSubmit(payload);
      if (!initialData) {
        setTitulo("");
        setClienteId("");
        setEntrenadorId("");
        setEjercicios([]);
      }
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        marginBottom: 20,
        padding: 15,
        border: "1px solid #ccc",
        display: "flex",
        flexDirection: "column",
        gap: 15,
      }}
    >
      <h3>{initialData ? "Editar Sesión" : "Nueva Sesión"}</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <input
          placeholder="Título de la sesión"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          style={{ padding: 6, width: "250px" }}
        />

        <select
          value={entrenadorId}
          onChange={(e) => setEntrenadorId(e.target.value)}
          style={{ padding: 6, width: "250px" }}
        >
          <option value="">Entrenador (opcional)</option>
          {entrenadores.map((u) => (
            <option key={u.id} value={u.id}>
              {u.nombre}
            </option>
          ))}
        </select>

        <select
          value={clienteId}
          onChange={(e) => setClienteId(e.target.value)}
          style={{ padding: 6, width: "250px" }}
        >
          <option value="">Seleccionar Cliente</option>
          {clientes.map((u) => (
            <option key={u.id} value={u.id}>
              {u.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* SELECTOR EJERCICIOS */}
      <EjercicioSelector onAdd={handleAddEjercicio} />

      {/* LISTA EJERCICIOS */}
      <div>
        <h4>Ejercicios en la sesión</h4>

        {ejercicios.length === 0 && <p>No hay ejercicios agregados.</p>}

        <ul style={{ paddingLeft: 15 }}>
          {ejercicios.map((e) => (
            <li key={e.id} style={{ marginBottom: 5 }}>
              <strong>{getNombreEjercicio(e.id)}</strong> — {e.series}×{e.reps}
              <button
                style={{ marginLeft: 10 }}
                onClick={() => removeEjercicio(e.id)}
                type="button"
              >
                Quitar
              </button>
            </li>
          ))}
        </ul>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: 10,
        }}
      >
        <button
          type="submit"
          style={{
            padding: "8px 16px",
            fontSize: 16,
          }}
        >
          {initialData ? "Guardar Cambios" : "Crear Sesión"}
        </button>
      </div>
    </form>
  );
}
