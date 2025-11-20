// src/pages/SesionesPage.jsx
import { useEffect, useState } from "react";
import {
  getSesiones,
  createSesion,
  updateSesion,
  deleteSesion
} from "../services/api";

import SesionForm from "../components/SesionForm";
import SesionesList from "../components/SesionesList";

export default function SesionesPage() {
  const [sesiones, setSesiones] = useState([]);
  const [editando, setEditando] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    cargarSesiones();
  }, []);

  async function cargarSesiones() {
    setLoading(true);
    try {
      const data = await getSesiones();
      setSesiones(data || []);
    } catch (err) {
      console.error("Error cargando sesiones:", err);
      setSesiones([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleCrear(payload) {
    await createSesion(payload);
    await cargarSesiones();
  }

  async function handleEditar(payload) {
    if (!editando) return;
    await updateSesion(editando.id, payload);
    setEditando(null);
    await cargarSesiones();
  }

  async function handleEliminar(id) {
    if (!confirm("Eliminar sesión?")) return;
    await deleteSesion(id);
    await cargarSesiones();
  }

  function iniciarEdicion(sesion) {
    setEditando(sesion);
    // scroll to form (optional)
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div>
      <h2>Gestión de Sesiones</h2>

      <SesionForm
        onSubmit={editando ? handleEditar : handleCrear}
        initialData={editando}
      />

      <hr />

      <h3>Sesiones existentes</h3>
      {loading ? <p>Cargando...</p> : (
        <SesionesList
          sesiones={sesiones}
          onEdit={iniciarEdicion}
          onDelete={handleEliminar}
          showAssignInfo={true}
        />
      )}
    </div>
  );
}
