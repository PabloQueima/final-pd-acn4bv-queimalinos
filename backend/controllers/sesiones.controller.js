import { readJSON, writeJSON } from "../utils/fileService.js";
import Sesion from "../models/Sesion.js";

const FILE = "sesiones.json";

function buildSesiones(arr) {
  return arr.map(s => Sesion.fromJSON(s));
}

export async function listarSesiones(req, res) {
  try {
    let sesiones = await getAll();

    if (req.query.clienteId) {
      sesiones = sesiones.filter(s => s.clienteId == req.query.clienteId);
    }

    res.json(sesiones);
  } catch (err) {
    res.status(500).json({ error: "No se pudieron leer sesiones" });
  }
}


export async function crearSesion(req, res) {
  try {
    const { titulo, entrenadorId, clienteId, ejercicios } = req.body;

    const data = await readJSON(FILE);

    const nueva = new Sesion(
      Date.now(),
      titulo,
      ejercicios || [],
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
    const { titulo, entrenadorId, clienteId, ejercicios } = req.body;

    if (titulo !== undefined) sesion.titulo = titulo.trim();
    if (clienteId !== undefined) sesion.clienteId = Number(clienteId);
    if (entrenadorId !== undefined) sesion.entrenadorId = Number(entrenadorId);
    if (Array.isArray(ejercicios)) sesion.ejercicios = ejercicios;

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

export async function sesionesPorCliente(req, res) {
  try {
    const id = Number(req.params.id);

    const data = await readJSON(FILE);
    const sesiones = buildSesiones(data);

    const result = sesiones
      .filter(s => s.clienteId === id)
      .map(s => s.toJSON());

    res.json(result);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error obteniendo sesiones del cliente" });
  }
}

export async function sesionesPorEntrenador(req, res) {
  try {
    const id = Number(req.params.id);

    const data = await readJSON(FILE);
    const sesiones = buildSesiones(data);

    const result = sesiones
      .filter(s => s.entrenadorId === id)
      .map(s => s.toJSON());

    res.json(result);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error obteniendo sesiones del entrenador" });
  }
}

export async function agregarEjercicioASesion(req, res) {
  try {
    const id = Number(req.params.id);
    const { ejercicioId, series, reps } = req.body;

    const data = await readJSON(FILE);
    let sesiones = buildSesiones(data);

    const sesion = sesiones.find(s => s.id === id);
    if (!sesion) return res.status(404).json({ error: "Sesión no encontrada" });

    sesion.agregarEjercicio(Number(ejercicioId), Number(series), Number(reps));

    await writeJSON(FILE, sesiones.map(s => s.toJSON()));
    res.json(sesion.toJSON());

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error agregando ejercicio a la sesión" });
  }
}

export async function eliminarEjercicioDeSesion(req, res) {
  try {
    const id = Number(req.params.id);
    const ejercicioId = Number(req.params.ejercicioId);

    const data = await readJSON(FILE);
    let sesiones = buildSesiones(data);

    const sesion = sesiones.find(s => s.id === id);
    if (!sesion) return res.status(404).json({ error: "Sesión no encontrada" });

    sesion.eliminarEjercicio(ejercicioId);

    await writeJSON(FILE, sesiones.map(s => s.toJSON()));
    res.json(sesion.toJSON());

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error eliminando ejercicio de la sesión" });
  }
}
