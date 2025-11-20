import { useEffect, useState } from "react";
import {
  getUsuarios,
  createUsuario,
  updateUsuario,
  deleteUsuario
} from "../services/api";

import UsuarioForm from "../components/UsuarioForm";
import UsuariosList from "../components/UsuariosList";

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [editando, setEditando] = useState(null);

  useEffect(() => {
    cargarUsuarios();
  }, []);

  async function cargarUsuarios() {
    try {
      const data = await getUsuarios();
      setUsuarios(data);
    } catch (err) {
      console.error("Error cargando usuarios:", err);
    }
  }

  async function handleCrear(data) {
    await createUsuario(data);
    await cargarUsuarios();
  }

  async function handleEditar(data) {
    await updateUsuario(editando.id, data);
    setEditando(null);
    await cargarUsuarios();
  }

  async function handleEliminar(id) {
    await deleteUsuario(id);
    await cargarUsuarios();
  }

  function iniciarEdicion(usuario) {
    setEditando(usuario);
  }

  return (
    <div>
      <h2>Gestión de Usuarios</h2>

      <UsuarioForm
        onSubmit={editando ? handleEditar : handleCrear}
        initialData={editando}
      />

      <UsuariosList
        usuarios={usuarios}
        onEdit={iniciarEdicion}
        onDelete={handleEliminar}
      />
    </div>
  );
}
