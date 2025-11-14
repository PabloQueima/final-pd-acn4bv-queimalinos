import { readJSON, writeJSON } from "../utils/fileService.js";

const FILE = "usuarios.json";

function getAll() {
  return readJSON(FILE);
}

export async function listarUsuarios(req, res) {
  try {
    const usuarios = await getAll();
    res.json(usuarios);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "No se pudieron leer usuarios" });
  }
}

export async function crearUsuario(req, res) {
  try {
    const { nombre, rol } = req.body;
    if (!nombre || !rol) return res.status(400).json({ error: "Faltan campos obligatorios" });

    const usuarios = await getAll();
    const nuevo = { id: Date.now().toString(), nombre: nombre.trim(), rol: rol.trim(), createdAt: new Date().toISOString() };
    usuarios.push(nuevo);
    await writeJSON(FILE, usuarios);
    res.status(201).json(nuevo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "No se pudo crear usuario" });
  }
}

export async function actualizarUsuario(req, res) {
  try {
    const id = req.params.id;
    const { nombre, rol } = req.body;
    let usuarios = await getAll();
    const idx = usuarios.findIndex(u => u.id === id);
    if (idx === -1) return res.status(404).json({ error: "Usuario no encontrado" });

    usuarios[idx] = { ...usuarios[idx], nombre: nombre ?? usuarios[idx].nombre, rol: rol ?? usuarios[idx].rol, updatedAt: new Date().toISOString() };
    await writeJSON(FILE, usuarios);
    res.json(usuarios[idx]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "No se pudo actualizar usuario" });
  }
}

export async function eliminarUsuario(req, res) {
  try {
    const id = req.params.id;
    let usuarios = await getAll();
    const exists = usuarios.some(u => u.id === id);
    if (!exists) return res.status(404).json({ error: "Usuario no encontrado" });

    usuarios = usuarios.filter(u => u.id !== id);
    await writeJSON(FILE, usuarios);
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "No se pudo eliminar usuario" });
  }
}
