import { db } from "../firebase.js";
import Sesion from "../models/Sesion.js";

async function fetchSesiones() {
  const snap = await db.collection("sesiones").get();
  return snap.docs.map(d => Sesion.fromJSON(d.data()));
}

async function findSesionById(id) {
  const snap = await db.collection("sesiones").where("id", "==", id).limit(1).get();
  return snap.empty ? null : { ref: snap.docs[0].ref, data: Sesion.fromJSON(snap.docs[0].data()) };
}

export async function listarSesiones(req, res) {
  try {
    let sesiones = await fetchSesiones();

    if (req.query.clienteId) {
      sesiones = sesiones.filter(s => s.clienteId == req.query.clienteId);
    }

    res.json(sesiones.map(s => s.toJSON()));
  } catch (err) {
    console.error("listarSesiones:", err);
    res.status(500).json({ error: "No se pudieron leer sesiones" });
  }
}

export async function crearSesion(req, res) {
  try {
    const { titulo, entrenadorId, clienteId, ejercicios } = req.body;

    const nueva = new Sesion(
      Date.now(),
      titulo,
      ejercicios || [],
      clienteId,
      entrenadorId
    );

    await db.collection("sesiones").add(nueva.toJSON());

    res.status(201).json(nueva.toJSON());
  } catch (err) {
    console.error("crearSesion:", err);
    res.status(500).json({ error: "No se pudo crear sesión" });
  }
}

export async function actualizarSesion(req, res) {
  try {
    const id = Number(req.params.id);

    const result = await findSesionById(id);
    if (!result) return res.status(404).json({ error: "Sesión no encontrada" });

    const { ref, data: sesion } = result;
    const { titulo, entrenadorId, clienteId, ejercicios } = req.body;

    if (titulo !== undefined) sesion.titulo = titulo.trim();
    if (clienteId !== undefined) sesion.clienteId = Number(clienteId);
    if (entrenadorId !== undefined) sesion.entrenadorId = Number(entrenadorId);
    if (Array.isArray(ejercicios)) sesion.ejercicios = ejercicios;

    sesion.updatedAt = new Date().toISOString();

    await ref.update(sesion.toJSON());

    res.json(sesion.toJSON());
  } catch (err) {
    console.error("actualizarSesion:", err);
    res.status(500).json({ error: "No se pudo actualizar sesión" });
  }
}

export async function eliminarSesion(req, res) {
  try {
    const id = Number(req.params.id);

    const result = await findSesionById(id);
    if (!result) return res.status(404).json({ error: "Sesión no encontrada" });

    await result.ref.delete();

    res.status(204).end();
  } catch (err) {
    console.error("eliminarSesion:", err);
    res.status(500).json({ error: "No se pudo eliminar sesión" });
  }
}

export async function sesionesPorCliente(req, res) {
  try {
    const id = Number(req.params.id);

    const sesiones = await fetchSesiones();

    const result = sesiones
      .filter(s => s.clienteId === id)
      .map(s => s.toJSON());

    res.json(result);
  } catch (err) {
    console.error("sesionesPorCliente:", err);
    res.status(500).json({ error: "Error obteniendo sesiones del cliente" });
  }
}

export async function sesionesPorEntrenador(req, res) {
  try {
    const id = Number(req.params.id);

    const sesiones = await fetchSesiones();

    const result = sesiones
      .filter(s => s.entrenadorId === id)
      .map(s => s.toJSON());

    res.json(result);
  } catch (err) {
    console.error("sesionesPorEntrenador:", err);
    res.status(500).json({ error: "Error obteniendo sesiones del entrenador" });
  }
}

export async function agregarEjercicioASesion(req, res) {
  try {
    const id = Number(req.params.id);
    const { ejercicioId, series, reps } = req.body;

    const result = await findSesionById(id);
    if (!result) return res.status(404).json({ error: "Sesión no encontrada" });

    const { ref, data: sesion } = result;

    sesion.agregarEjercicio(Number(ejercicioId), Number(series), Number(reps));

    await ref.update(sesion.toJSON());

    res.json(sesion.toJSON());
  } catch (err) {
    console.error("agregarEjercicioASesion:", err);
    res.status(500).json({ error: "Error agregando ejercicio a la sesión" });
  }
}

export async function eliminarEjercicioDeSesion(req, res) {
  try {
    const id = Number(req.params.id);
    const ejercicioId = Number(req.params.ejercicioId);

    const result = await findSesionById(id);
    if (!result) return res.status(404).json({ error: "Sesión no encontrada" });

    const { ref, data: sesion } = result;

    sesion.eliminarEjercicio(ejercicioId);

    await ref.update(sesion.toJSON());

    res.json(sesion.toJSON());
  } catch (err) {
    console.error("eliminarEjercicioDeSesion:", err);
    res.status(500).json({ error: "Error eliminando ejercicio de la sesión" });
  }
}
