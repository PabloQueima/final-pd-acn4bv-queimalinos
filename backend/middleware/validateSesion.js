import { db } from "../firebase.js";

export async function validateSesion(req, res, next) {
  try {
    const { titulo, clienteUid, entrenadorUid, ejercicios } = req.body;

    if (!titulo || typeof titulo !== "string" || !titulo.trim()) {
      return res.status(400).json({ error: "El campo 'titulo' es obligatorio." });
    }

    if (!clienteUid || typeof clienteUid !== "string") {
      return res.status(400).json({ error: "El campo 'clienteUid' es obligatorio." });
    }

    const clienteDoc = await db.collection("usuarios").doc(clienteUid).get();
    if (!clienteDoc.exists || clienteDoc.data().rol !== "cliente") {
      return res.status(400).json({ error: "clienteUid inválido." });
    }

    if (entrenadorUid) {
      const entrenadorDoc = await db.collection("usuarios").doc(entrenadorUid).get();
      if (!entrenadorDoc.exists || entrenadorDoc.data().rol !== "entrenador") {
        return res.status(400).json({ error: "entrenadorUid inválido." });
      }
    }

    if (ejercicios !== undefined) {
      if (!Array.isArray(ejercicios)) {
        return res.status(400).json({ error: "El campo 'ejercicios' debe ser un array." });
      }

      for (const ej of ejercicios) {
        if (!ej.id) {
          return res.status(400).json({ error: "Cada ejercicio debe tener un id." });
        }

        const snap = await db
          .collection("ejercicios")
          .where("id", "==", Number(ej.id))
          .limit(1)
          .get();

        if (snap.empty) {
          return res.status(400).json({ error: `Ejercicio ${ej.id} inexistente.` });
        }

        if (ej.series !== undefined && typeof ej.series !== "number") {
          return res.status(400).json({ error: "series debe ser número." });
        }

        if (ej.reps !== undefined && typeof ej.reps !== "number") {
          return res.status(400).json({ error: "reps debe ser número." });
        }
      }
    }

    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error validando sesión" });
  }
}
