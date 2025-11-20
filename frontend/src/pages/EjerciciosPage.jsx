import { useEffect, useState } from "react";
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

  return (
    <div>
      <h2>Gestión de Ejercicios</h2>

      <EjercicioForm
        onSubmit={editando ? handleEditar : handleCrear}
        initialData={editando}
      />

      <EjerciciosList
        ejercicios={ejercicios}
        onEdit={iniciarEdicion}
        onDelete={handleEliminar}
      />
    </div>
  );
}
