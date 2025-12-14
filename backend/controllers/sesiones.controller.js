import { db } from "../firebase.js";
import Sesion from "../models/Sesion.js";

async function fetchSesiones() {
  const snap = await db.collection("sesiones").get();
  return snap.docs.map(d => Sesion.fromJSON(d.data()));
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
