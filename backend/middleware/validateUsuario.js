export function validateUsuario(req, res, next) {
  const { nombre, rol } = req.body;

  if (!nombre || typeof nombre !== "string" || !nombre.trim()) {
    return res.status(400).json({
      error: "El campo 'nombre' es obligatorio y debe ser texto."
    });
  }

  const rolesValidos = ["admin", "entrenador", "cliente"];

  if (!rol || typeof rol !== "string" || !rolesValidos.includes(rol.toLowerCase())) {
    return res.status(400).json({
      error: "El campo 'rol' es obligatorio y debe ser uno de: admin, entrenador, cliente."
    });
  }

  next();
}
