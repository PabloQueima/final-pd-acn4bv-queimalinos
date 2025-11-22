import { useEffect, useState } from "react";
import { getEjercicios } from "../services/api";

export default function EjercicioSelector({ onAdd }) {
  const [ejercicios, setEjercicios] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const pageSize = 5;

  const [series, setSeries] = useState(3);
  const [reps, setReps] = useState(10);

  useEffect(() => {
    cargarEjercicios();
  }, [search]);

  async function cargarEjercicios() {
    setLoading(true);
    const data = await getEjercicios();
    const filtro = search.trim().toLowerCase();

    const filtrado = filtro
      ? data.filter(
          (e) =>
            e.nombre.toLowerCase().includes(filtro) ||
            e.descripcion.toLowerCase().includes(filtro) ||
            e.parteCuerpo.toLowerCase().includes(filtro)
        )
      : data;

    setEjercicios(filtrado);
    setPage(1);
    setLoading(false);
  }

  const totalPages = Math.ceil(ejercicios.length / pageSize) || 1;
  const pageData = ejercicios.slice((page - 1) * pageSize, page * pageSize);

  function handleAdd(ejercicio) {
    onAdd({
      id: ejercicio.id,
      series: Number(series),
      reps: Number(reps),
    });
  }

  return (
    <div style={{ marginBottom: 20, padding: 10, border: "1px solid #ccc" }}>
      <h4>Agregar Ejercicio</h4>

      {/* BUSCADOR */}
      <input
        placeholder="Buscar ejercicio..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: 10, width: "100%" }}
      />

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <>
          {/* LISTA PAGINADA */}
          <ul style={{ padding: 0, listStyle: "none" }}>
            {pageData.map((e) => (
              <li
                key={e.id}
                style={{
                  padding: "8px 0",
                  borderBottom: "1px solid #eee",
                }}
              >
                <strong>{e.nombre}</strong>
                <br />
                <small>{e.descripcion}</small>
                <br />
                <small>
                  Parte: {e.parteCuerpo} | Elemento: {e.elemento || "ninguno"}
                </small>
                <br />

                <button
                  type="button"
                  onClick={() => handleAdd(e)}
                  style={{ marginTop: 5 }}
                >
                  Agregar
                </button>
              </li>
            ))}

            {pageData.length === 0 && <p>No se encontraron ejercicios.</p>}
          </ul>

          {/* PAGINACIÓN */}
          <div style={{ margin: "10px 0" }}>
            <button disabled={page <= 1} onClick={() => setPage(page - 1)}>
              ◀
            </button>

            <span style={{ margin: "0 10px" }}>
              Página {page} / {totalPages}
            </span>

            <button
              disabled={page >= totalPages}
              onClick={() => setPage(page + 1)}
            >
              ▶
            </button>
          </div>

          {/* SERIES Y REPS */}
          <div style={{ marginTop: 10 }}>
            <label>
              Series:
              <input
                type="number"
                min="1"
                value={series}
                onChange={(e) => setSeries(e.target.value)}
                style={{ width: 60, marginLeft: 5 }}
              />
            </label>

            <label style={{ marginLeft: 10 }}>
              Reps:
              <input
                type="number"
                min="1"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
                style={{ width: 60, marginLeft: 5 }}
              />
            </label>
          </div>
        </>
      )}
    </div>
  );
}
