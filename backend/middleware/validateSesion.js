import { db } from "../firebase.js";

export async function validateSesion(req, res, next) {
  try {
    const { titulo, clienteId, entrenadorId, ejercicios } = req.body;

    if (!titulo || typeof titulo !== "string" || !titulo.trim()) {
      return res.status(400).json({ error: "El campo 'titulo' es obligatorio y debe ser texto." });
    }

    if (!clienteId) {
      return res.status(400).json({ error: "El campo 'clienteId' es obligatorio." });
    }

    // ===== VALIDAR CLIENTE =====
    const clienteSnap = await db
      .collection("usuarios")
      .where("id", "==", Number(clienteId))
      .limit(1)
      .get();

    if (clienteSnap.empty || clienteSnap.docs[0].data().rol !== "cliente") {
      return res.status(400).json({
        error: "El clienteId no es válido o no corresponde a un usuario con rol 'cliente'."
      });
    }

    // ===== VALIDAR ENTRENADOR (opcional) =====
    if (entrenadorId !== undefined && entrenadorId !== null) {
      const entrenadorSnap = await db
        .collection("usuarios")
        .where("id", "==", Number(entrenadorId))
        .limit(1)
        .get();

      if (entrenadorSnap.empty || entrenadorSnap.docs[0].data().rol !== "entrenador") {
        return res.status(400).json({
          error: "El entrenadorId no corresponde a un entrenador válido."
        });
      }
    }

    // ===== VALIDAR EJERCICIOS =====
    if (ejercicios !== undefined) {
      if (!Array.isArray(ejercicios)) {
        return res.status(400).json({ error: "El campo 'ejercicios' debe ser un array." });
      }

      for (const ej of ejercicios) {
        if (!ej.id) {
          return res.status(400).json({ error: "Cada ejercicio debe contener un 'id' válido." });
        }

        const ejercicioSnap = await db
          .collection("ejercicios")
          .where("id", "==", Number(ej.id))
          .limit(1)
          .get();

        if (ejercicioSnap.empty) {
          return res.status(400).json({ error: `El ejercicio con id ${ej.id} no existe.` });
        }

        if (ej.series !== undefined && typeof ej.series !== "number") {
          return res.status(400).json({ error: "El campo 'series' debe ser un número." });
        }

        if (ej.reps !== undefined && typeof ej.reps !== "number") {
          return res.status(400).json({ error: "El campo 'reps' debe ser un número." });
        }
      }
    }

    next();

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error validando sesión" });
  }
}
