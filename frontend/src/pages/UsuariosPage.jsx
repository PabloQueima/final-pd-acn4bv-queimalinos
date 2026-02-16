import { useEffect, useRef, useState } from "react";
import {
  getUsuarios,
  createUsuario,
  updateUsuario,
  deleteUsuario
} from "../services/api";

import UsuarioForm from "../components/UsuarioForm";
import UsuariosList from "../components/UsuariosList";

export default function UsuariosPage({ onUsuariosChange }) {
  const [usuarios, setUsuarios] = useState([]);
  const [editando, setEditando] = useState(null);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const debounceRef = useRef(null);

  const [page, setPage] = useState(1);
  const pageSize = 7;

  useEffect(() => {
    cargarUsuarios();
  }, []);

  async function cargarUsuarios() {
    try {
      const data = await getUsuarios();
      setUsuarios(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error cargando usuarios:", err);
      setUsuarios([]);
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
    try {
      const nuevo = await createUsuario(data);

      setUsuarios(prev => [...prev, nuevo]);

      if (onUsuariosChange) {
        onUsuariosChange();
      }

    } catch (err) {
      console.error("Error creando usuario:", err);
    }
  }

  async function handleEditar(data) {
    if (!editando?.uid) return;

    try {
      const actualizado = await updateUsuario(editando.uid, data);

      setUsuarios(prev =>
        prev.map(u =>
          u.uid === editando.uid ? actualizado : u
        )
      );

      setEditando(null);

      if (onUsuariosChange) {
        onUsuariosChange();
      }

    } catch (err) {
      console.error("Error actualizando usuario:", err);
    }
  }

  async function handleEliminar(uid) {
    if (!uid) return;

    try {
      await deleteUsuario(uid);

      setUsuarios(prev =>
        prev.filter(u => u.uid !== uid)
      );

      if (onUsuariosChange) {
        onUsuariosChange();
      }

    } catch (err) {
      console.error("Error eliminando usuario:", err);
    }
  }

  function iniciarEdicion(usuario) {
    setEditando(usuario);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const filtrados = usuarios.filter(u =>
    u.nombre?.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  const totalPages = Math.ceil(filtrados.length / pageSize) || 1;
  const inicio = (page - 1) * pageSize;
  const visibles = filtrados.slice(inicio, inicio + pageSize);

  return (
    <div style={{ padding: 20 }}>
      <input
        placeholder="Buscar por nombre..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: 10 }}
      />

      <UsuarioForm
        onSubmit={editando ? handleEditar : handleCrear}
        initialData={editando}
      />

      <UsuariosList
        usuarios={visibles}
        onEdit={iniciarEdicion}
        onDelete={handleEliminar}
      />

      <div style={{ marginTop: 15 }}>
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
