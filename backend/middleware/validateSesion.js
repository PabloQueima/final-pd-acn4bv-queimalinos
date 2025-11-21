import { readJSON } from "../utils/fileService.js";

export async function validateSesion(req, res, next) {
  try {
    const { titulo, clienteId, entrenadorId, ejercicios } = req.body;

    if (!titulo || typeof titulo !== "string" || !titulo.trim()) {
      return res.status(400).json({ error: "El campo 'titulo' es obligatorio y debe ser texto." });
    }

    if (!clienteId) {
      return res.status(400).json({ error: "El campo 'clienteId' es obligatorio." });
    }

    const usuarios = await readJSON("usuarios.json");
    const ejerciciosDB = await readJSON("ejercicios.json");

    const cliente = usuarios.find(u => Number(u.id) === Number(clienteId) && u.rol === "cliente");
    if (!cliente) {
      return res.status(400).json({
        error: "El clienteId no es válido o no corresponde a un usuario con rol 'cliente'."
      });
    }

    if (entrenadorId !== undefined && entrenadorId !== null) {
      const entrenador = usuarios.find(u => Number(u.id) === Number(entrenadorId) && u.rol === "entrenador");
      if (!entrenador) {
        return res.status(400).json({ error: "El entrenadorId no corresponde a un entrenador válido." });
      }
    }

    if (ejercicios !== undefined) {

      if (!Array.isArray(ejercicios)) {
        return res.status(400).json({ error: "El campo 'ejercicios' debe ser un array." });
      }

      for (const ej of ejercicios) {
        if (!ej.id) {
          return res.status(400).json({ error: "Cada ejercicio debe contener un 'id' válido." });
        }

        const exists = ejerciciosDB.find(e => Number(e.id) === Number(ej.id));
        if (!exists) {
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
