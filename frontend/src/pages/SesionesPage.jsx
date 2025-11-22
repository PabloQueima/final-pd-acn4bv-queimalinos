import { useEffect, useState, useRef } from "react";
import {
  getSesiones,
  createSesion,
  updateSesion,
  deleteSesion,
  getUsuarios,
  getEjercicios
} from "../services/api";

import SesionForm from "../components/SesionForm";
import SesionesList from "../components/SesionesList";

export default function SesionesPage() {
  const [sesiones, setSesiones] = useState([]);
  const [editando, setEditando] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const debounceRef = useRef(null);

  const [page, setPage] = useState(1);
  const pageSize = 5;

  const [usuariosMap, setUsuariosMap] = useState({});
  const [ejerciciosMap, setEjerciciosMap] = useState({});

  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const currentRol = storedUser?.rol || "cliente";
  const currentId = storedUser?.id || null;

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
  }, [search]);

  useEffect(() => {
    cargarReferencias();
  }, []);

  async function cargarReferencias() {
    try {
      const [usuarios, ejercicios] = await Promise.all([
        getUsuarios(),
        getEjercicios()
      ]);

      const uMap = {};
      (usuarios || []).forEach(u => (uMap[u.id] = u));

      const eMap = {};
      (ejercicios || []).forEach(e => (eMap[e.id] = e));

      setUsuariosMap(uMap);
      setEjerciciosMap(eMap);
    } catch {
      setUsuariosMap({});
      setEjerciciosMap({});
    }
  }

  useEffect(() => {
    cargarSesiones();
  }, [debouncedSearch]);

  async function cargarSesiones() {
    setLoading(true);
    try {
      let data;
      if (currentRol === "entrenador") {
        data = await getSesiones({ entrenadorId: currentId });
      } else if (currentRol === "cliente") {
        data = await getSesiones({ clienteId: currentId });
      } else {
        data = await getSesiones();
      }

      let result = data || [];

      if (debouncedSearch.trim() !== "") {
        result = result.filter((s) =>
          s.titulo.toLowerCase().includes(debouncedSearch.toLowerCase())
        );
      }

      setSesiones(result);
    } catch {
      setSesiones([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleCrear(payload) {
    setSaving(true);
    try {
      if (currentRol === "entrenador" && !payload.entrenadorId) {
        payload.entrenadorId = currentId;
      }
      await createSesion(payload);
      await cargarSesiones();
      setEditando(null);
      setPage(1);
    } finally {
      setSaving(false);
    }
  }

  async function handleEditar(payload) {
    if (!editando) return;
    setSaving(true);
    try {
      await updateSesion(editando.id, payload);
      setEditando(null);
      await cargarSesiones();
    } finally {
      setSaving(false);
    }
  }

  async function handleEliminar(id) {
    if (!confirm("Eliminar sesión?")) return;
    try {
      await deleteSesion(id);
      const remaining = sesiones.length - 1;
      const totalPagesAfter = Math.max(1, Math.ceil(remaining / pageSize));
      if (page > totalPagesAfter) setPage(totalPagesAfter);
      await cargarSesiones();
    } catch {}
  }

  function iniciarEdicion(sesion) {
    setEditando({
      ...sesion,
      clienteId: sesion.clienteId ?? "",
      entrenadorId: sesion.entrenadorId ?? "",
      ejercicios: Array.isArray(sesion.ejercicios) ? sesion.ejercicios : []
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelarEdicion() {
    setEditando(null);
  }

  const totalPages = Math.max(1, Math.ceil(sesiones.length / pageSize));
  const pageData = sesiones.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div style={{ padding: 20 }}>
      <h2>Crear/Editar Sesiones</h2>

      <div style={{
        background: "#fff",
        padding: 16,
        borderRadius: 8,
        boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
        marginBottom: 18
      }}>
        <SesionForm
          onSubmit={editando ? handleEditar : handleCrear}
          initialData={editando}
        />

        {editando && (
          <div style={{ marginTop: 8 }}>
            <button type="button" onClick={cancelarEdicion} style={{ marginRight: 8 }}>
              Cancelar edición
            </button>
          </div>
        )}

        {saving && <p style={{ marginTop: 8 }}>Guardando...</p>}
      </div>

      <div style={{ marginBottom: 12, display: "flex", gap: 8, alignItems: "center" }}>
        <input
          placeholder="Buscar sesión por título..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: 8,
            borderRadius: 6,
            border: "1px solid #ccc",
            width: "300px",
            maxWidth: "100%"
          }}
        />
        <button
          onClick={() => { setSearch(""); setPage(1); }}
          type="button"
          style={{ padding: "8px 12px", borderRadius: 6 }}
        >
          Limpiar
        </button>
      </div>

      <hr />

      <h3>Sesiones existentes para este Entrenador</h3>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <>
          <div
            style={{
              minHeight: "420px",
              transition: "min-height 0.2s ease",
              display: "flex",
              flexDirection: "column"
            }}
          >
            <SesionesList
              sesiones={pageData}
              onEdit={currentRol !== "cliente" ? iniciarEdicion : null}
              onDelete={currentRol !== "cliente" ? handleEliminar : null}
              showAssignInfo={true}
              showButtons={currentRol !== "cliente"}
              ejerciciosMap={ejerciciosMap}
              usuariosMap={usuariosMap}
            />
          </div>

          <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 8 }}>
            <button disabled={page <= 1} onClick={() => setPage(1)} type="button">Primera</button>
            <button disabled={page <= 1} onClick={() => setPage(page - 1)} type="button">◀</button>

            <span> Página {page} de {totalPages} </span>

            <button disabled={page >= totalPages} onClick={() => setPage(page + 1)} type="button">▶</button>
            <button disabled={page >= totalPages} onClick={() => setPage(totalPages)} type="button">Última</button>
          </div>
        </>
      )}
    </div>
  );
}
