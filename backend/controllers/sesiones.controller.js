import { db } from "../firebase.js";
import Sesion from "../models/Sesion.js";

export async function crearSesion(req, res) {
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

    res.status(201).json(Sesion.fromFirestore(doc));
  } catch (err) {
    res.status(500).json({ error: "No se pudo crear sesión" });
  }
}

export async function agregarEjercicioASesion(req, res) {
  try {
    const { id } = req.params;
    const ejercicio = req.body;

    const ref = db.collection("sesiones").doc(id);
    const doc = await ref.get();

    if (!doc.exists) {
      return res.status(404).json({ error: "Sesión no encontrada" });
    }

    const sesion = Sesion.fromFirestore(doc);

    // Si ya existe el ejercicio, lo reemplaza
    const existe = sesion.ejercicios.find(
      e => String(e.id) === String(ejercicio.id)
    );

    let ejerciciosActualizados;

    if (existe) {
      ejerciciosActualizados = sesion.ejercicios.map(e =>
        String(e.id) === String(ejercicio.id) ? ejercicio : e
      );
    } else {
      ejerciciosActualizados = [...sesion.ejercicios, ejercicio];
    }

    await ref.update({
      ejercicios: ejerciciosActualizados,
      updatedAt: new Date().toISOString()
    });

    const updatedDoc = await ref.get();
    res.json(Sesion.fromFirestore(updatedDoc));
  } catch (err) {
    res.status(500).json({ error: "No se pudo agregar ejercicio a la sesión" });
  }
}


export async function listarSesiones(req, res) {
  try {
    const snap = await db.collection("sesiones").get();
    const sesiones = snap.docs.map(doc => Sesion.fromFirestore(doc));
    res.json(sesiones);
  } catch (err) {
    res.status(500).json({ error: "No se pudieron leer sesiones" });
  }
}

export async function sesionesPorCliente(req, res) {
  try {
    const { uid } = req.params;

    const snap = await db
      .collection("sesiones")
      .where("clienteUid", "==", uid)
      .get();

    const sesiones = snap.docs.map(doc => Sesion.fromFirestore(doc));
    res.json(sesiones);
  } catch (err) {
    res.status(500).json({ error: "No se pudieron leer sesiones del cliente" });
  }
}

export async function sesionesPorEntrenador(req, res) {
  try {
    const { uid } = req.params;

    const snap = await db
      .collection("sesiones")
      .where("entrenadorUid", "==", uid)
      .get();

    const sesiones = snap.docs.map(doc => Sesion.fromFirestore(doc));
    res.json(sesiones);
  } catch (err) {
    res.status(500).json({ error: "No se pudieron leer sesiones del entrenador" });
  }
}

export async function obtenerSesion(req, res) {
  try {
    const { id } = req.params;

    const doc = await db.collection("sesiones").doc(id).get();

    if (!doc.exists) {
      return res.status(404).json({ error: "Sesión no encontrada" });
    }

    res.json(Sesion.fromFirestore(doc));
  } catch (err) {
    res.status(500).json({ error: "No se pudo obtener la sesión" });
  }
}

export async function actualizarSesion(req, res) {
  try {
    const { id } = req.params;
    const { titulo, ejercicios, clienteUid, entrenadorUid } = req.body;

    const ref = db.collection("sesiones").doc(id);
    const doc = await ref.get();

    if (!doc.exists) {
      return res.status(404).json({ error: "Sesión no encontrada" });
    }

    const updates = {
      updatedAt: new Date().toISOString()
    };

    if (titulo !== undefined) updates.titulo = titulo;
    if (ejercicios !== undefined) updates.ejercicios = ejercicios;
    if (clienteUid !== undefined) updates.clienteUid = clienteUid;
    if (entrenadorUid !== undefined) updates.entrenadorUid = entrenadorUid;

    await ref.update(updates);

    const updatedDoc = await ref.get();
    res.json(Sesion.fromFirestore(updatedDoc));
  } catch (err) {
    res.status(500).json({ error: "No se pudo actualizar sesión" });
  }
}

export async function eliminarSesion(req, res) {
  try {
    const { id } = req.params;

    const ref = db.collection("sesiones").doc(id);
    const doc = await ref.get();

    if (!doc.exists) {
      return res.status(404).json({ error: "Sesión no encontrada" });
    }

    await ref.delete();
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: "No se pudo eliminar la sesión" });
  }
}

export async function eliminarEjercicioDeSesion(req, res) {
  try {
    const { id, ejercicioId } = req.params;

    const ref = db.collection("sesiones").doc(id);
    const doc = await ref.get();

    if (!doc.exists) {
      return res.status(404).json({ error: "Sesión no encontrada" });
    }

    const sesion = Sesion.fromFirestore(doc);

    const ejerciciosActualizados = sesion.ejercicios.filter(
      e => String(e.id) !== String(ejercicioId)
    );

    await ref.update({
      ejercicios: ejerciciosActualizados,
      updatedAt: new Date().toISOString()
    });

    const updatedDoc = await ref.get();
    res.json(Sesion.fromFirestore(updatedDoc));
  } catch (err) {
    res.status(500).json({ error: "No se pudo eliminar ejercicio de la sesión" });
  }
}
