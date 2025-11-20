import { readJSON, writeJSON } from "../utils/fileService.js";

const FILE = "sesiones.json";

function getAll() {
  return readJSON(FILE);
}

export async function listarSesiones(req, res) {
  try {
    const sesiones = await getAll();
    res.json(sesiones);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "No se pudieron leer sesiones" });
  }
}

export async function crearSesion(req, res) {
  try {
    const { titulo, entrenadorId, clienteId, ejerciciosAsignados } = req.body;

    if (!titulo || !titulo.trim()) {
      return res.status(400).json({ error: "El campo 'titulo' es obligatorio" });
    }

    if (clienteId === undefined || clienteId === null || clienteId === "") {
      return res.status(400).json({ error: "El campo 'clienteId' es obligatorio" });
    }

    const sesiones = await getAll();

    const nuevo = {
      id: Date.now().toString(),
      titulo: titulo.trim(),
      entrenadorId: entrenadorId ?? null,
      clienteId,
      ejerciciosAsignados: Array.isArray(ejerciciosAsignados) ? ejerciciosAsignados : [],
      createdAt: new Date().toISOString(),
    };

    sesiones.push(nuevo);
    await writeJSON(FILE, sesiones);
    res.status(201).json(nuevo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "No se pudo crear sesión" });
  }
}

export async function actualizarSesion(req, res) {
  try {
    const id = req.params.id;
    const { titulo, entrenadorId, clienteId, ejerciciosAsignados } = req.body;

    if (titulo !== undefined && !titulo.trim()) {
      return res.status(400).json({ error: "El titulo no puede estar vacío" });
    }

    let sesiones = await getAll();
    const idx = sesiones.findIndex((s) => s.id === id);
    if (idx === -1) return res.status(404).json({ error: "Sesion no encontrada" });

    sesiones[idx] = {
      ...sesiones[idx],
      titulo: titulo ?? sesiones[idx].titulo,
      entrenadorId: entrenadorId ?? sesiones[idx].entrenadorId,
      clienteId: clienteId ?? sesiones[idx].clienteId,
      ejerciciosAsignados: Array.isArray(ejerciciosAsignados)
        ? ejerciciosAsignados
        : sesiones[idx].ejerciciosAsignados,
      updatedAt: new Date().toISOString(),
    };

    await writeJSON(FILE, sesiones);
    res.json(sesiones[idx]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "No se pudo actualizar sesion" });
  }
}

export async function eliminarSesion(req, res) {
  try {
    const id = req.params.id;
    let sesiones = await getAll();
    const exists = sesiones.some((s) => s.id === id);
    if (!exists) return res.status(404).json({ error: "Sesion no encontrada" });

    sesiones = sesiones.filter((s) => s.id !== id);
    await writeJSON(FILE, sesiones);

    res.json({ message: "Sesión eliminada correctamente", id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "No se pudo eliminar sesion" });
  }
}
