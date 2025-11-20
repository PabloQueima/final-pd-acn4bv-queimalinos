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
  const { nombre, rol, password } = req.body;

  if (!nombre || !rol || !password) {
    return res.status(400).json({ error: "nombre, rol y password son obligatorios" });
  }

  const data = await readJSON(FILE);

  const nuevo = new Usuario(Date.now(), nombre, rol, password);
  data.push(nuevo);

  await writeJSON(FILE, data);
  res.status(201).json(nuevo);
}

export async function actualizarUsuario(req, res) {
  const { id } = req.params;
  const { nombre, rol, password } = req.body;

  const data = await readJSON(FILE);
  const index = data.findIndex(u => String(u.id) === String(id));

  if (index === -1) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  data[index] = {
    ...data[index],
    nombre: nombre ?? data[index].nombre,
    rol: rol ?? data[index].rol,
    password: password ?? data[index].password
  };

  await writeJSON(FILE, data);

  res.json(data[index]);
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
