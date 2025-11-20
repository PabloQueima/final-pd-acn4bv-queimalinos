import { readJSON, writeJSON } from "../utils/fileService.js";
import Sesion from "../models/Sesion.js";

const FILE = "sesiones.json";

function buildSesiones(arr) {
  return arr.map(s => Sesion.fromJSON(s));
}

export async function listarSesiones(req, res) {
  try {
    const data = await readJSON(FILE);
    const sesiones = buildSesiones(data);
    res.json(sesiones.map(s => s.toJSON()));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "No se pudieron leer sesiones" });
  }
}

export async function crearSesion(req, res) {
  try {
    const { titulo, entrenadorId, clienteId, ejerciciosAsignados } = req.body;

    const data = await readJSON(FILE);

    const nueva = new Sesion(
      Date.now(),
      titulo,
      ejerciciosAsignados || [],
      clienteId,
      entrenadorId
    );

    data.push(nueva.toJSON());
    await writeJSON(FILE, data);

    res.status(201).json(nueva.toJSON());
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "No se pudo crear sesión" });
  }
}

export async function actualizarSesion(req, res) {
  try {
    const id = Number(req.params.id);

    const data = await readJSON(FILE);
    let sesiones = buildSesiones(data);

    const idx = sesiones.findIndex(s => s.id === id);
    if (idx === -1) return res.status(404).json({ error: "Sesión no encontrada" });

    const sesion = sesiones[idx];
    const { titulo, entrenadorId, clienteId, ejerciciosAsignados } = req.body;

    if (titulo !== undefined) sesion.titulo = titulo.trim();
    if (clienteId !== undefined) sesion.clienteId = Number(clienteId);
    if (entrenadorId !== undefined) sesion.entrenadorId = Number(entrenadorId);
    if (Array.isArray(ejerciciosAsignados)) sesion.ejerciciosAsignados = ejerciciosAsignados;

    sesion.updatedAt = new Date().toISOString();

    sesiones[idx] = sesion;

    await writeJSON(FILE, sesiones.map(s => s.toJSON()));

    res.json(sesion.toJSON());
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "No se pudo actualizar sesión" });
  }
}

export async function eliminarSesion(req, res) {
  try {
    const id = Number(req.params.id);
    let data = await readJSON(FILE);

    const exists = data.some(s => Number(s.id) === id);
    if (!exists) return res.status(404).json({ error: "Sesión no encontrada" });

    data = data.filter(s => Number(s.id) !== id);

    await writeJSON(FILE, data);

    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "No se pudo eliminar sesión" });
  }
}
