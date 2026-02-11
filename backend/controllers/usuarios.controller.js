import { db } from "../firebase.js";
import Usuario from "../models/Usuario.js";

async function fetchUsuarios() {
  const snap = await db.collection("usuarios").get();
  return snap.docs.map(d => Usuario.fromJSON(d.data()));
}


export async function crearUsuario(req, res) {
  try {
    const { uid, nombre, rol } = req.body;

    if (!uid || !nombre || !rol) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    const ref = db.collection("usuarios").doc(uid);
    const doc = await ref.get();

    if (doc.exists) {
      return res.status(400).json({ error: "El usuario ya existe" });
    }

    const usuario = new Usuario(
      uid,
      nombre.trim(),
      rol.trim().toLowerCase()
    );

    await ref.set(usuario.toJSON());

    res.status(201).json(usuario.toJSON());
  } catch (err) {
    res.status(500).json({ error: "No se pudo crear usuario" });
  }
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
    res.status(500).json({ error: "No se pudieron leer usuarios" });
  }
}

export async function obtenerUsuario(req, res) {
  try {
    const { uid } = req.params;

    const doc = await db.collection("usuarios").doc(uid).get();
    if (!doc.exists) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json(Usuario.fromJSON(doc.data()).toJSON());
  } catch (err) {
    res.status(500).json({ error: "Error obteniendo usuario" });
  }
}

export async function actualizarUsuario(req, res) {
  try {
    const { uid } = req.params;
    const { nombre, rol } = req.body;

    const ref = db.collection("usuarios").doc(uid);
    const doc = await ref.get();

    if (!doc.exists) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const data = doc.data();

    if (nombre !== undefined) data.nombre = nombre.trim();
    if (rol !== undefined) data.rol = rol.trim().toLowerCase();

    await ref.update(data);

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "No se pudo actualizar usuario" });
  }
}

export async function eliminarUsuario(req, res) {
  try {
    const { uid } = req.params;

    await db.collection("usuarios").doc(uid).delete();

    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: "No se pudo eliminar usuario" });
  }
}
