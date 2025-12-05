import { db } from "../firebase.js";
import Usuario from "../models/Usuario.js";
import bcrypt from "bcrypt";

/** Convierte docs Firestore → array de Usuario */
async function fetchUsuarios() {
  const snap = await db.collection("usuarios").get();
  return snap.docs.map(d => Usuario.fromJSON(d.data()));
}

/** Busca un usuario por ID */
async function findUsuarioById(id) {
  const snap = await db.collection("usuarios").where("id", "==", id).limit(1).get();
  return snap.empty ? null : { ref: snap.docs[0].ref, data: Usuario.fromJSON(snap.docs[0].data()) };
}

export async function listarUsuarios(req, res) {
  try {
    const { rol } = req.query;

    let usuarios = await fetchUsuarios();

    if (rol) {
      usuarios = usuarios.filter(u => u.rol === rol.toLowerCase());
    }

    res.json(usuarios.map(u => u.toJSON()));
  } catch (err) {
    console.error("listarUsuarios:", err);
    res.status(500).json({ error: "No se pudieron leer usuarios" });
  }
}

export async function obtenerUsuario(req, res) {
  try {
    const id = Number(req.params.id);

    const snap = await db
      .collection("usuarios")
      .where("id", "==", id)
      .limit(1)
      .get();

    if (snap.empty) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const data = snap.docs[0].data();
    res.json(Usuario.fromJSON(data).toJSON());
  } catch (err) {
    console.error("obtenerUsuario:", err);
    res.status(500).json({ error: "No se pudo obtener usuario" });
  }
}


export async function crearUsuario(req, res) {
  try {
    const { nombre, rol, password } = req.body;

    if (!nombre || !rol || !password) {
      return res.status(400).json({ error: "nombre, rol y password son obligatorios" });
    }

    const hash = await bcrypt.hash(password, 10);
    const nuevo = new Usuario(Date.now(), nombre, rol, hash);

    await db.collection("usuarios").add(nuevo.toJSON());

    res.status(201).json(nuevo.toJSON());
  } catch (err) {
    console.error("crearUsuario:", err);
    res.status(500).json({ error: "No se pudo crear usuario" });
  }
}

export async function actualizarUsuario(req, res) {
  try {
    const id = Number(req.params.id);

    const result = await findUsuarioById(id);
    if (!result) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const { ref, data: usuario } = result;
    const { nombre, rol, password } = req.body;

    if (nombre !== undefined) usuario.nombre = nombre.trim();
    if (rol !== undefined) usuario.rol = rol.trim().toLowerCase();
    if (password !== undefined) {
      usuario.passwordHash = await bcrypt.hash(password, 10);
    }

    await ref.update(usuario.toJSON());

    res.json(usuario.toJSON());
  } catch (err) {
    console.error("actualizarUsuario:", err);
    res.status(500).json({ error: "No se pudo actualizar usuario" });
  }
}

export async function eliminarUsuario(req, res) {
  try {
    const id = Number(req.params.id);

    const result = await findUsuarioById(id);
    if (!result) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    await result.ref.delete();

    res.status(204).end();
  } catch (err) {
    console.error("eliminarUsuario:", err);
    res.status(500).json({ error: "No se pudo eliminar usuario" });
  }
}
