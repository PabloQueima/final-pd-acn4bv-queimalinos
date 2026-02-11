import { db } from "../firebase.js";
import Sesion from "../models/Sesion.js";

async function fetchSesiones() {
  const snap = await db.collection("sesiones").get();
  return snap.docs.map(d => Sesion.fromJSON(d.data()));
}

export async function actualizarSesion(req, res) {
  try {
    const { id } = req.params;
    const { titulo, ejercicios, clienteUid, entrenadorUid } = req.body;

    const snap = await db.collection("sesiones").get();
    const doc = snap.docs.find(d => d.data().id == id);

    if (!doc) {
      return res.status(404).json({ error: "Sesión no encontrada" });
    }

    const data = doc.data();

    if (titulo !== undefined) data.titulo = titulo;
    if (ejercicios !== undefined) data.ejercicios = ejercicios;
    if (clienteUid !== undefined) data.clienteUid = clienteUid;
    if (entrenadorUid !== undefined) data.entrenadorUid = entrenadorUid;

    await db.collection("sesiones").doc(doc.id).update(data);

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "No se pudo actualizar sesión" });
  }
}


export async function listarSesiones(req, res) {
  try {
    let sesiones = await fetchSesiones();

    if (req.query.clienteUid) {
      sesiones = sesiones.filter(s => s.clienteUid === req.query.clienteUid);
    }

    if (req.query.entrenadorUid) {
      sesiones = sesiones.filter(s => s.entrenadorUid === req.query.entrenadorUid);
    }

    res.json(sesiones.map(s => s.toJSON()));
  } catch (err) {
    res.status(500).json({ error: "No se pudieron leer sesiones" });
  }
}

export async function crearSesion(req, res) {
  try {
    const { titulo, clienteUid, entrenadorUid, ejercicios } = req.body;

    const nueva = new Sesion(
      Date.now(),
      titulo,
      ejercicios || [],
      clienteUid,
      entrenadorUid
    );

    await db.collection("sesiones").add(nueva.toJSON());

    res.status(201).json(nueva.toJSON());
  } catch (err) {
    res.status(500).json({ error: "No se pudo crear sesión" });
  }
}

export async function eliminarSesion(req, res) {
  try {
    const { id } = req.params;

    const snap = await db.collection("sesiones").get();
    const doc = snap.docs.find(d => d.data().id == id);

    if (!doc) {
      return res.status(404).json({ error: "Sesión no encontrada" });
    }

    await db.collection("sesiones").doc(doc.id).delete();

    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: "No se pudo eliminar la sesión" });
  }
}

export async function obtenerSesion(req, res) {
  try {
    const { id } = req.params;

    const snap = await db.collection("sesiones").get();
    const doc = snap.docs.find(d => d.data().id == id);

    if (!doc) {
      return res.status(404).json({ error: "Sesión no encontrada" });
    }

    res.json(doc.data());
  } catch (err) {
    res.status(500).json({ error: "No se pudo obtener la sesión" });
  }
}


export async function agregarEjercicioASesion(req, res) {
  try {
    const { id } = req.params;
    const { ejercicio } = req.body;

    if (!ejercicio) {
      return res.status(400).json({ error: "Debe enviarse un ejercicio" });
    }

    const snap = await db.collection("sesiones").get();
    const doc = snap.docs.find(d => d.data().id == id);

    if (!doc) {
      return res.status(404).json({ error: "Sesión no encontrada" });
    }

    const data = doc.data();

    if (!Array.isArray(data.ejercicios)) {
      data.ejercicios = [];
    }

    data.ejercicios.push(ejercicio);

    await db.collection("sesiones").doc(doc.id).update({
      ejercicios: data.ejercicios
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "No se pudo agregar el ejercicio" });
  }
}

export async function eliminarEjercicioDeSesion(req, res) {
  try {
    const { id } = req.params;
    const { ejercicioId } = req.body;

    if (!ejercicioId) {
      return res.status(400).json({ error: "Debe enviarse el id del ejercicio" });
    }

    const snap = await db.collection("sesiones").get();
    const doc = snap.docs.find(d => d.data().id == id);

    if (!doc) {
      return res.status(404).json({ error: "Sesión no encontrada" });
    }

    const data = doc.data();

    if (!Array.isArray(data.ejercicios)) {
      return res.status(400).json({ error: "La sesión no tiene ejercicios" });
    }

    const ejerciciosActualizados = data.ejercicios.filter(
      e => e.id != ejercicioId
    );

    await db.collection("sesiones").doc(doc.id).update({
      ejercicios: ejerciciosActualizados
    });

    res.json({
      ...data,
      ejercicios: ejerciciosActualizados
    });

  } catch (err) {
    res.status(500).json({ error: "No se pudo eliminar el ejercicio" });
  }
}

export async function sesionesPorCliente(req, res) {
  try {
    const { clienteUid } = req.params;

    const snap = await db.collection("sesiones").get();
    const sesiones = snap.docs
      .map(d => d.data())
      .filter(s => s.clienteUid === clienteUid);

    res.json(sesiones);
  } catch (err) {
    res.status(500).json({ error: "No se pudieron obtener las sesiones del cliente" });
  }
}

export async function sesionesPorEntrenador(req, res) {
  try {
    const { entrenadorUid } = req.params;

    const snap = await db.collection("sesiones").get();
    const sesiones = snap.docs
      .map(d => d.data())
      .filter(s => s.entrenadorUid === entrenadorUid);

    res.json(sesiones);
  } catch (err) {
    res.status(500).json({ error: "No se pudieron obtener las sesiones del entrenador" });
  }
}
