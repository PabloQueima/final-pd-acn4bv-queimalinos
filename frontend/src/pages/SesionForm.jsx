import { useEffect, useState } from "react";
import { getUsuarios } from "../services/api";
import EjercicioSelector from "./EjercicioSelector";

export default function SesionForm({ onSubmit, initialData = null }) {
  const [titulo, setTitulo] = useState("");
  const [clienteId, setClienteId] = useState("");
  const [entrenadorId, setEntrenadorId] = useState("");
  const [ejercicios, setEjercicios] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  const [error, setError] = useState("");

  useEffect(() => {
    cargarUsuarios();
  }, []);

  useEffect(() => {
    if (initialData) {
      setTitulo(initialData.titulo || "");
      setClienteId(initialData.clienteId || "");
      setEntrenadorId(initialData.entrenadorId || "");
      setEjercicios(initialData.ejerciciosAsignados || []);
    }
  }, [initialData]);

  async function cargarUsuarios() {
    const data = await getUsuarios();
    setUsuarios(data);
  }

  const clientes = usuarios.filter(u => u.rol === "cliente");
  const entrenadores = usuarios.filter(u => u.rol === "entrenador");

  function handleAddEjercicio(item) {
    const exists = ejercicios.find(e => e.id === item.id);

    if (exists) {
      setEjercicios(
        ejercicios.map(e => (e.id === item.id ? item : e))
      );
    } else {
      setEjercicios([...ejercicios, item]);
    }
  }

  function removeEjercicio(id) {
    setEjercicios(ejercicios.filter(e => e.id !== id));
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
      ejerciciosAsignados: ejercicios
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
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <h3>{initialData ? "Editar Sesión" : "Nueva Sesión"}</h3>

      <div>
        <input
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
      </div>

      {/* ENTRENADOR */}
      <div>
        <select
          value={entrenadorId}
          onChange={(e) => setEntrenadorId(e.target.value)}
        >
          <option value="">Entrenador (opcional)</option>
          {entrenadores.map((u) => (
            <option key={u.id} value={u.id}>
              {u.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* CLIENTE */}
      <div>
        <select
          value={clienteId}
          onChange={(e) => setClienteId(e.target.value)}
        >
          <option value="">Seleccionar Cliente</option>
          {clientes.map((u) => (
            <option key={u.id} value={u.id}>
              {u.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* SELECTOR DE EJERCICIOS */}
      <EjercicioSelector onAdd={handleAddEjercicio} />

      {/* LISTA EJERCICIOS DE LA SESIÓN */}
      <div>
        <h4>Ejercicios en la sesión</h4>

        {ejercicios.length === 0 && <p>No hay ejercicios agregados.</p>}

        <ul>
          {ejercicios.map((e) => (
            <li key={e.id}>
              ID {e.id} — {e.series}×{e.reps}
              <button
                style={{ marginLeft: 10 }}
                onClick={() => removeEjercicio(e.id)}
              >
                Quitar
              </button>
            </li>
          ))}
        </ul>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit">
        {initialData ? "Guardar Cambios" : "Crear Sesión"}
      </button>
    </form>
  );
}
