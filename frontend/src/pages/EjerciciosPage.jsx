import { useEffect, useRef, useState } from "react";
import {
  getEjercicios,
  createEjercicio,
  updateEjercicio,
  deleteEjercicio
} from "../services/api";

import EjercicioForm from "../components/EjercicioForm";
import EjerciciosList from "../components/EjerciciosList";

export default function EjerciciosPage({ onEjerciciosChange }) {
  const [ejercicios, setEjercicios] = useState([]);
  const [editando, setEditando] = useState(null);
  const [formKey, setFormKey] = useState(0);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const debounceRef = useRef(null);

  const [page, setPage] = useState(1);
  const pageSize = 6;

  useEffect(() => {
    cargarEjercicios();
  }, []);

  async function cargarEjercicios() {
    try {
      const data = await getEjercicios();
      setEjercicios(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error cargando ejercicios:", err);
      setEjercicios([]);
    }
  }

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 300);

    return () => clearTimeout(debounceRef.current);
  }, [search]);

  async function handleCrear(data) {
    const confirmado = window.confirm(
      `¿Confirmás la creación del ejercicio "${data.nombre}"?`
    );

    if (!confirmado) return;

    try {
      const nuevo = await createEjercicio(data);

      setEjercicios(prev => [...prev, nuevo]);

      // limpiar formulario
      setFormKey(prev => prev + 1);

      if (onEjerciciosChange) {
        onEjerciciosChange();
      }

    } catch (err) {
      console.error("Error creando ejercicio:", err);
    }
  }

  async function handleEditar(data) {
    if (!editando?.id) return;

    const confirmado = window.confirm(
      `¿Confirmás los cambios para el ejercicio "${editando.nombre}"?`
    );

    if (!confirmado) return;

    try {
      const actualizado = await updateEjercicio(editando.id, data);

      setEjercicios(prev =>
        prev.map(e =>
          e.id === editando.id ? actualizado : e
        )
      );

      setEditando(null);

      if (onEjerciciosChange) {
        onEjerciciosChange();
      }

    } catch (err) {
      console.error("Error actualizando ejercicio:", err);
    }
  }

  async function handleEliminar(id) {
    const ejercicio = ejercicios.find(e => e.id === id);

    const confirmado = window.confirm(
      `¿Confirmás eliminar el ejercicio "${ejercicio?.nombre}"?`
    );

    if (!confirmado) return;

    try {
      await deleteEjercicio(id);

      setEjercicios(prev =>
        prev.filter(e => e.id !== id)
      );

      if (onEjerciciosChange) {
        onEjerciciosChange();
      }

    } catch (err) {
      console.error("Error eliminando ejercicio:", err);
    }
  }

  function iniciarEdicion(ejercicio) {
    setEditando(ejercicio);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const filtrados = ejercicios.filter(e =>
    e.nombre.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  const totalPages = Math.ceil(filtrados.length / pageSize) || 1;
  const inicio = (page - 1) * pageSize;
  const visibles = filtrados.slice(inicio, inicio + pageSize);

  return (
    <div style={{ padding: 20 }}>
      <input
        placeholder="Buscar ejercicio..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: 15 }}
      />

      <EjercicioForm
        key={formKey}
        onSubmit={editando ? handleEditar : handleCrear}
        initialData={editando}
      />

      <EjerciciosList
        ejercicios={visibles}
        onEdit={iniciarEdicion}
        onDelete={handleEliminar}
      />

      <div style={{ marginTop: 20 }}>
        Página {page} de {totalPages}
        <br />

        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Anterior
        </button>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          style={{ marginLeft: 10 }}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
