import { useEffect, useRef, useState } from "react";
import {
  getEjercicios,
  createEjercicio,
  updateEjercicio,
  deleteEjercicio
} from "../services/api";

import EjercicioForm from "../components/EjercicioForm";
import EjerciciosList from "../components/EjerciciosList";

export default function EjerciciosPage() {
  const [ejercicios, setEjercicios] = useState([]);
  const [editando, setEditando] = useState(null);

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
      setEjercicios(data);
    } catch (err) {
      console.error("Error cargando ejercicios:", err);
    }
  }

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 300);
  }, [search]);

  async function handleCrear(data) {
    await createEjercicio(data);
    await cargarEjercicios();
  }

  async function handleEditar(data) {
    await updateEjercicio(editando.id, data);
    setEditando(null);
    await cargarEjercicios();
  }

  async function handleEliminar(id) {
    await deleteEjercicio(id);
    await cargarEjercicios();
  }

  function iniciarEdicion(ejercicio) {
    setEditando(ejercicio);
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

        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
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
