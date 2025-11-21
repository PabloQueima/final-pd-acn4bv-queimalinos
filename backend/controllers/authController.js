import { readJSON } from "../utils/fileService.js";

export async function login(req, res) {
  const { nombre, password } = req.body;

  if (!nombre || !password) {
    return res.status(400).json({ error: "Faltan credenciales" });
  }

  const usuarios = await readJSON("usuarios.json");

  const found = usuarios.find(
    u => u.nombre.toLowerCase() === nombre.toLowerCase()
  );

  if (!found) {
    return res.status(401).json({ error: "Usuario no encontrado" });
  }

  if (found.password !== password) {
    return res.status(401).json({ error: "Contraseña incorrecta" });
  }

  return res.json({
    id: found.id,
    nombre: found.nombre,
    rol: found.rol
  });
}
