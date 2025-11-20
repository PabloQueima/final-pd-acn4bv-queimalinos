import { readJSON, writeJSON } from "../utils/fileService.js";
import Usuario from "../models/Usuario.js";

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
    const { nombre, rol } = req.body;

    const data = await readJSON(FILE);
    const nuevo = new Usuario(Date.now(), nombre, rol);

    data.push(nuevo.toJSON());
    await writeJSON(FILE, data);

    res.status(201).json(nuevo.toJSON());
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "No se pudo crear usuario" });
  }
}

export async function actualizarUsuario(req, res) {
  try {
    const id = Number(req.params.id);

    const data = await readJSON(FILE);
    let usuarios = buildUsuarios(data);

    const idx = usuarios.findIndex(u => u.id === id);
    if (idx === -1) return res.status(404).json({ error: "Usuario no encontrado" });

    const usuario = usuarios[idx];
    const { nombre, rol } = req.body;

    if (nombre !== undefined) usuario.nombre = nombre.trim();
    if (rol !== undefined) usuario.rol = rol.trim().toLowerCase();

    usuarios[idx] = usuario;

    await writeJSON(FILE, usuarios.map(u => u.toJSON()));

    res.json(usuario.toJSON());
  } catch (err) {
    console.error(err);
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
