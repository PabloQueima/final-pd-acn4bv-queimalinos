export function validateUsuario(req, res, next) {
  const { nombre, rol } = req.body;

  if (!nombre || typeof nombre !== "string" || !nombre.trim()) {
    return res.status(400).json({ error: "El campo 'nombre' es obligatorio." });
  }

  const rolesValidos = ["admin", "entrenador", "cliente"];
  if (rol && !rolesValidos.includes(rol.toLowerCase())) {
    return res.status(400).json({ error: "Rol inválido." });
  }

  next();
}
