import { db } from "../firebase.js";
import Sesion from "../models/Sesion.js";

async function getSesionOrFail(id) {
  if (!id || typeof id !== "string") {
    const error = new Error("ID inválido");
    error.status = 400;
    throw error;
  }

  const ref = db.collection("sesiones").doc(id);
  const doc = await ref.get();

  if (!doc.exists) {
    const error = new Error("Sesión no encontrada");
    error.status = 404;
    throw error;
  }

  return { ref, doc };
}

export async function crearSesion(req, res, next) {
  try {
    const { titulo, clienteUid, entrenadorUid, ejercicios } = req.body;

    const nueva = new Sesion(
      null,
      titulo,
      ejercicios || [],
      clienteUid,
      entrenadorUid
    );

    const ref = await db.collection("sesiones").add(nueva.toJSON());
    const doc = await ref.get();

    res.status(201).json({ ...Sesion.fromFirestore(doc) });
  } catch (err) {
    next(err);
  }
}

export async function listarSesiones(req, res, next) {
  try {
    const snap = await db.collection("sesiones").get();
    const sesiones = snap.docs.map(doc => ({
      ...Sesion.fromFirestore(doc)
    }));

    res.json(sesiones);
  } catch (err) {
    next(err);
  }
}

export async function obtenerSesion(req, res, next) {
  try {
    const { id } = req.params;
    const { doc } = await getSesionOrFail(id);
    res.json({ ...Sesion.fromFirestore(doc) });
  } catch (err) {
    next(err);
  }
}

export async function actualizarSesion(req, res, next) {
  try {
    const { id } = req.params;
    const { ref } = await getSesionOrFail(id);

    const updates = {
      ...req.body,
      updatedAt: new Date().toISOString()
    };

    await ref.update(updates);
    const updatedDoc = await ref.get();

    res.json({ ...Sesion.fromFirestore(updatedDoc) });
  } catch (err) {
    next(err);
  }
}

export async function eliminarSesion(req, res, next) {
  try {
    const { id } = req.params;
    const { ref } = await getSesionOrFail(id);

    await ref.delete();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}

export async function sesionesPorCliente(req, res, next) {
  try {
    const { uid } = req.params;

    const snap = await db
      .collection("sesiones")
      .where("clienteUid", "==", uid)
      .get();

    const sesiones = snap.docs.map(doc => ({
      ...Sesion.fromFirestore(doc)
    }));

    res.json(sesiones);
  } catch (err) {
    next(err);
  }
}

export async function sesionesPorEntrenador(req, res, next) {
  try {
    const { uid } = req.params;

    const snap = await db
      .collection("sesiones")
      .where("entrenadorUid", "==", uid)
      .get();

    const sesiones = snap.docs.map(doc => ({
      ...Sesion.fromFirestore(doc)
    }));

    res.json(sesiones);
  } catch (err) {
    next(err);
  }
}

export async function agregarEjercicioASesion(req, res, next) {
  try {
    const { id } = req.params;
    const ejercicio = req.body;

    const { ref, doc } = await getSesionOrFail(id);
    const sesion = Sesion.fromFirestore(doc);

    if (!ejercicio || !ejercicio.id) {
      const error = new Error("Ejercicio inválido");
      error.status = 400;
      throw error;
    }

    const existe = sesion.ejercicios.find(
      e => String(e.id) === String(ejercicio.id)
    );

    const ejerciciosActualizados = existe
      ? sesion.ejercicios.map(e =>
          String(e.id) === String(ejercicio.id) ? ejercicio : e
        )
      : [...sesion.ejercicios, ejercicio];

    await ref.update({
      ejercicios: ejerciciosActualizados,
      updatedAt: new Date().toISOString()
    });

    const updatedDoc = await ref.get();
    res.json({ ...Sesion.fromFirestore(updatedDoc) });
  } catch (err) {
    next(err);
  }
}

export async function eliminarEjercicioDeSesion(req, res, next) {
  try {
    const { id, ejercicioId } = req.params;
    const { ref, doc } = await getSesionOrFail(id);

    const sesion = Sesion.fromFirestore(doc);

    const ejerciciosActualizados = sesion.ejercicios.filter(
      e => String(e.id) !== String(ejercicioId)
    );

    await ref.update({
      ejercicios: ejerciciosActualizados,
      updatedAt: new Date().toISOString()
    });

    const updatedDoc = await ref.get();
    res.json({ ...Sesion.fromFirestore(updatedDoc) });
  } catch (err) {
    next(err);
  }
}
