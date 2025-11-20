import { readJSON } from "../utils/fileService.js";

export async function validateSesion(req, res, next) {
  try {
    const { titulo, clienteId, entrenadorId, ejerciciosAsignados } = req.body;

    // Validación básica
    if (!titulo || typeof titulo !== "string" || !titulo.trim()) {
      return res.status(400).json({ error: "El campo 'titulo' es obligatorio y debe ser texto." });
    }

    if (!clienteId) {
      return res.status(400).json({ error: "El campo 'clienteId' es obligatorio." });
    }

    const usuarios = await readJSON("usuarios.json");
    const ejercicios = await readJSON("ejercicios.json");

    // Cliente debe existir y ser cliente
    const cliente = usuarios.find(u => u.id == clienteId && u.rol === "cliente");
    if (!cliente) {
      return res.status(400).json({ error: "El clienteId no es válido o no corresponde a un usuario con rol 'cliente'." });
    }

    // Entrenador opcional, pero si viene debe existir
    if (entrenadorId !== undefined && entrenadorId !== null) {
      const entrenador = usuarios.find(u => u.id == entrenadorId && u.rol === "entrenador");
      if (!entrenador) {
        return res.status(400).json({ error: "El entrenadorId no corresponde a un entrenador válido." });
      }
    }

    // Validar ejerciciosAsignados
    if (ejerciciosAsignados !== undefined) {
      if (!Array.isArray(ejerciciosAsignados)) {
        return res.status(400).json({ error: "El campo 'ejerciciosAsignados' debe ser un array." });
      }

      for (const ej of ejerciciosAsignados) {
        if (!ej.id || typeof ej.id !== "number") {
          return res.status(400).json({ error: "Cada ejercicio debe contener 'id' numérico." });
        }

        if (!ejercicios.find(e => e.id === ej.id)) {
          return res.status(400).json({ error: `El ejercicio con id ${ej.id} no existe.` });
        }

        if (typeof ej.series !== "number" || ej.series <= 0) {
          return res.status(400).json({ error: "El campo 'series' debe ser un número mayor a 0." });
        }

        if (typeof ej.reps !== "number" || ej.reps <= 0) {
          return res.status(400).json({ error: "El campo 'reps' debe ser un número mayor a 0." });
        }
      }
    }

    next();

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error validando sesión" });
  }
}
