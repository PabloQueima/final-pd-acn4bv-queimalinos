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
  const currentUid = storedUser?.uid || null;

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
      (usuarios || []).forEach((u) => {
        if (u.uid) uMap[u.uid] = u;
      });

      const eMap = {};
      (ejercicios || []).forEach((e) => {
        eMap[e.id] = e;
      });

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
        data = await getSesiones({ entrenadorUid: currentUid });
      } else if (currentRol === "cliente") {
        data = await getSesiones({ clienteUid: currentUid });
      } else {
        data = await getSesiones();
      }

      let result = data || [];

      if (debouncedSearch.trim() !== "") {
        result = result.filter((s) =>
          s.titulo?.toLowerCase().includes(debouncedSearch.toLowerCase())
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
      if (currentRol === "entrenador") {
        payload.entrenadorUid = currentUid;
      }

      await createSesion(payload);
      await cargarSesiones();
      setPage(1);
    } finally {
      setSaving(false);
    }
  }

  async function handleEditar(payload) {
    if (!editando) return;

    setSaving(true);
    try {
      if (currentRol === "entrenador") {
        payload.entrenadorUid = currentUid;
      }

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
      const totalPagesAfter = Math.max(
        1,
        Math.ceil(remaining / pageSize)
      );
      if (page > totalPagesAfter) setPage(totalPagesAfter);

      await cargarSesiones();
    } catch {}
  }

  function iniciarEdicion(sesion) {
    setEditando({
      ...sesion,
      clienteUid: sesion.clienteUid ?? "",
      entrenadorUid: sesion.entrenadorUid ?? "",
      ejercicios: Array.isArray(sesion.ejercicios)
        ? sesion.ejercicios
        : []
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelarEdicion() {
    setEditando(null);
  }

  const totalPages = Math.max(1, Math.ceil(sesiones.length / pageSize));
  const pageData = sesiones.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <div
      style={{
        padding: "12px 16px",
        maxWidth: 1800,
        margin: "0 auto"
      }}
    >
      <h2 style={{ marginBottom: 12 }}>Crear / Editar Sesiones</h2>

      {/* Formulario */}
      <div
        style={{
          background: "#fff",
          padding: 16,
          borderRadius: 8,
          boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
          marginBottom: 18
        }}
      >
        <SesionForm
          onSubmit={editando ? handleEditar : handleCrear}
          onCancel={cancelarEdicion}
          initialData={editando}
          currentRol={currentRol}
          currentUid={currentUid}
        />

        {saving && <p style={{ marginTop: 8 }}>Guardando...</p>}
      </div>

      {/* Buscador */}
      <div
        style={{
          marginBottom: 12,
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
          alignItems: "center"
        }}
      >
        <input
          placeholder="Buscar sesión por título..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: 8,
            borderRadius: 6,
            border: "1px solid #ccc",
            flex: "1 1 240px",
            minWidth: 200
          }}
        />

        <button
          onClick={() => {
            setSearch("");
            setPage(1);
          }}
          type="button"
          style={{ padding: "8px 12px", borderRadius: 6 }}
        >
          Limpiar
        </button>
      </div>

      <hr />

      <h3>Sesiones existentes</h3>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <>
          {/* GRID DE SESIONES */}
          <div
            style={{
              minHeight: 420,
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(380px, 1fr))",
              gap: 20,
              alignItems: "start"
            }}
          >
            <SesionesList
              sesiones={pageData}
              onEdit={
                currentRol !== "cliente" ? iniciarEdicion : null
              }
              onDelete={
                currentRol !== "cliente" ? handleEliminar : null
              }
              showAssignInfo={true}
              showButtons={currentRol !== "cliente"}
              ejerciciosMap={ejerciciosMap}
              usuariosMap={usuariosMap}
            />
          </div>

          {/* Paginación */}
          <div
            style={{
              marginTop: 14,
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: 8
            }}
          >
            <button
              disabled={page <= 1}
              onClick={() => setPage(1)}
              type="button"
            >
              Primera
            </button>
            <button
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
              type="button"
            >
              ◀
            </button>

            <span>
              Página {page} de {totalPages}
            </span>

            <button
              disabled={page >= totalPages}
              onClick={() => setPage(page + 1)}
              type="button"
            >
              ▶
            </button>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage(totalPages)}
              type="button"
            >
              Última
            </button>
          </div>
        </>
      )}
    </div>
  );
}
