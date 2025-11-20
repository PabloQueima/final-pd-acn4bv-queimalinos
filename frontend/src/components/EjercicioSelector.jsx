// src/components/EjercicioSelector.jsx

import { useEffect, useState } from "react";
import { getEjercicios } from "../services/api";

export default function EjercicioSelector({ onAdd }) {
  const [ejercicios, setEjercicios] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const [selectedId, setSelectedId] = useState("");
  const [series, setSeries] = useState(3);
  const [reps, setReps] = useState(10);

  useEffect(() => {
    cargarEjercicios();
  }, [search]);

  async function cargarEjercicios() {
    const data = await getEjercicios({ search });
    setEjercicios(data);
    setPage(1); // reset al buscar
  }

  const totalPages = Math.ceil(ejercicios.length / pageSize);
  const pageData = ejercicios.slice((page - 1) * pageSize, page * pageSize);

  function handleAdd() {
    if (!selectedId) return;
    onAdd({
      id: selectedId,
      series: Number(series),
      reps: Number(reps)
    });
    setSelectedId("");
  }

  return (
    <div style={{ marginBottom: 20 }}>
      <h4>Agregar Ejercicio</h4>

      {/* BUSCADOR */}
      <input
        placeholder="Buscar ejercicio..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: 10 }}
      />

      {/* SELECT PAGINADO */}
      <select
        value={selectedId}
        onChange={(e) => setSelectedId(e.target.value)}
        style={{ display: "block", marginBottom: 10 }}
      >
        <option value="">Seleccionar...</option>
        {pageData.map((e) => (
          <option key={e.id} value={e.id}>
            {e.nombre}
          </option>
        ))}
      </select>

      {/* PAGINACION */}
      <div style={{ marginBottom: 10 }}>
        <button
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
        >
          ◀
        </button>

        <span style={{ margin: "0 10px" }}>
          Página {page} / {totalPages || 1}
        </span>

        <button
          disabled={page >= totalPages}
          onClick={() => setPage(page + 1)}
        >
          ▶
        </button>
      </div>

      {/* SERIES / REPS */}
      <div style={{ marginBottom: 10 }}>
        <input
          type="number"
          min="1"
          value={series}
          onChange={(e) => setSeries(e.target.value)}
          placeholder="Series"
        />

        <input
          type="number"
          min="1"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
          placeholder="Reps"
          style={{ marginLeft: 10 }}
        />
      </div>

      <button onClick={handleAdd}>
        Agregar ejercicio a la sesión
      </button>
    </div>
  );
}
