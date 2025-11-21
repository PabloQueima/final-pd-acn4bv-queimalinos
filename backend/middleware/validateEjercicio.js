export function validateEjercicio(req, res, next) {
  const { nombre, descripcion, parteCuerpo, elemento } = req.body;

  if (!nombre || typeof nombre !== "string" || !nombre.trim()) {
    return res.status(400).json({
      error: "El campo 'nombre' es obligatorio y debe ser un texto no vacío."
    });
  }

  if (descripcion !== undefined && typeof descripcion !== "string") {
    return res.status(400).json({ error: "El campo 'descripcion' debe ser texto." });
  }

  if (parteCuerpo !== undefined && typeof parteCuerpo !== "string") {
    return res.status(400).json({ error: "El campo 'parteCuerpo' debe ser texto." });
  }

  if (elemento !== undefined && typeof elemento !== "string") {
    return res.status(400).json({ error: "El campo 'elemento' debe ser texto." });
  }

  next();
}
