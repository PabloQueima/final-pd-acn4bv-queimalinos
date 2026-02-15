import { useEffect, useRef, useState } from "react";
import { getEjercicios } from "../services/api";

export default function EjercicioSelector({ onAdd }) {
  const [ejercicios, setEjercicios] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const debounceRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const pageSize = 5;

  const [series, setSeries] = useState(3);
  const [reps, setReps] = useState(10);

  function abrirImagen(url) {
    window.open(
      url,
      "_blank",
      "width=600,height=600,resizable=yes,scrollbars=yes"
    );
  }

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
  }, [search]);

  useEffect(() => {
    cargarEjercicios();
  }, [debouncedSearch]);

  async function cargarEjercicios() {
    setLoading(true);
    const data = await getEjercicios();
    const f = debouncedSearch.trim().toLowerCase();

    const filtrado = f
      ? data.filter(
          (e) =>
            e.nombre.toLowerCase().includes(f) ||
            e.descripcion.toLowerCase().includes(f) ||
            e.parteCuerpo.toLowerCase().includes(f)
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
      reps: Number(reps)
    });
  }

  return (
    <div style={{ marginBottom: 20, padding: 10, border: "1px solid #ccc" }}>
      <h4>Agregar Ejercicio</h4>

      <input
        placeholder="Buscar ejercicio..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: 10, width: "300px" }}
      />

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <>
          <ul style={{ padding: 0, listStyle: "none" }}>
            {pageData.map((e) => (
              <li
                key={e.id}
                style={{
                  padding: "8px 0",
                  borderBottom: "1px solid #eee"
                }}
              >
                <div>
                  <strong>{e.nombre}</strong>

                  {e.imageUrl && (
                    <div style={{ marginTop: 2 }}>
                      <button
                        onClick={() => abrirImagen(e.imageUrl)}
                        style={{
                          background: "transparent",
                          border: "none",
                          color: "#0066cc",
                          fontWeight: "bold",
                          textDecoration: "underline",
                          cursor: "pointer",
                          padding: 0,
                          fontSize: 14
                        }}
                      >
                        Ver imagen
                      </button>
                    </div>
                  )}
                </div>

                <div><small>{e.descripcion}</small></div>
                <div><small>Parte del cuerpo: {e.parteCuerpo}</small></div>
                <div><small>Elemento: {e.elemento || "Ninguno"}</small></div>

                <button
                  onClick={() => handleAdd(e)}
                  style={{ marginTop: 5 }}
                >
                  Agregar
                </button>
              </li>
            ))}
            {pageData.length === 0 && (
              <p>No se encontraron ejercicios.</p>
            )}
          </ul>

          <div style={{ margin: "10px 0" }}>
            <button
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
            >
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

          <div style={{ marginTop: 10 }}>
            <label>
              Series:
              <input
                type="number"
                min="1"
                value={series}
                onChange={(e) => setSeries(e.target.value)}
              />
            </label>
            <label style={{ marginLeft: 10 }}>
              Reps:
              <input
                type="number"
                min="1"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
              />
            </label>
          </div>
        </>
      )}
    </div>
  );
}
