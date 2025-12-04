import { readJSON, writeJSON } from "../utils/fileService.js";
import Usuario from "../models/Usuario.js";
import bcrypt from "bcrypt";

const FILE = "usuarios.json";

function buildUsuarios(arr) {
  return arr.map(u => Usuario.fromJSON(u));
}

export async function listarUsuarios(req, res) {
  try {
    const { rol } = req.query;

    const data = await readJSON(FILE);
    let usuarios = buildUsuarios(data);

    if (rol) {
      const rolLower = rol.toLowerCase();
      usuarios = usuarios.filter(u => u.rol === rolLower);
    }

    res.json(usuarios.map(u => u.toJSON()));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "No se pudieron leer usuarios" });
  }
}

export async function crearUsuario(req, res) {
  try {
    const { nombre, rol, password } = req.body;

    if (!nombre || !rol || !password) {
      return res.status(400).json({
        error: "nombre, rol y password son obligatorios"
      });
    }

    const data = await readJSON(FILE);

    // HASH DE CONTRASEÑA
    const hash = await bcrypt.hash(password, 10);

    const nuevo = new Usuario(Date.now(), nombre, rol, hash);

    data.push(nuevo.toJSON());
    await writeJSON(FILE, data);

    return res.status(201).json(nuevo.toJSON());

  } catch (err) {
    console.error("Error creando usuario:", err);
    res.status(500).json({ error: "No se pudo crear usuario" });
  }
}

export async function actualizarUsuario(req, res) {
  try {
    const { id } = req.params;
    const { nombre, rol, password } = req.body;

    const data = await readJSON(FILE);
    const index = data.findIndex(u => String(u.id) === String(id));

    if (index === -1) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Clon del usuario existente
    const usuarioActual = Usuario.fromJSON(data[index]);

    // Actualizaciones de campos básicos
    if (nombre !== undefined) usuarioActual.nombre = nombre.trim();
    if (rol !== undefined) usuarioActual.rol = rol.toLowerCase();

    // Si se envía una nueva contraseña, la re-hasheamos
    if (password !== undefined) {
      const hash = await bcrypt.hash(password, 10);
      usuarioActual.passwordHash = hash;
    }

    // Guardamos el usuario actualizado
    data[index] = usuarioActual.toJSON();
    await writeJSON(FILE, data);

    res.json(usuarioActual.toJSON());

  } catch (err) {
    console.error("Error actualizando usuario:", err);
    res.status(500).json({ error: "No se pudo actualizar usuario" });
  }
}

export async function eliminarUsuario(req, res) {
  try {
    const id = Number(req.params.id);

    let data = await readJSON(FILE);
    const exists = data.some(u => Number(u.id) === id);
    if (!exists) return res.status(404).json({ error: "Usuario no encontrado" });

    data = data.filter(u => Number(u.id) !== id);
    await writeJSON(FILE, data);

    res.status(204).end();

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "No se pudo eliminar usuario" });
  }
}
