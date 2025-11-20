export function validateUsuario(req, res, next) {
  const { nombre, rol, password } = req.body;

  if (!nombre) {
    return res.status(400).json({ error: "El campo 'nombre' es obligatorio." });
  }

  if (!password) {
    return res.status(400).json({ error: "El campo 'password' es obligatorio." });
  }

  const rolesValidos = ["admin", "entrenador", "cliente"];
  if (!rolesValidos.includes(rol)) {
    return res.status(400).json({ error: "Rol inválido." });
  }

  next();
}
