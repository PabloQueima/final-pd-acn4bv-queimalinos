import admin from "firebase-admin";
import { db } from "../firebase.js";
import Usuario from "../models/Usuario.js";

async function fetchUsuarios() {
  const snap = await db.collection("usuarios").get();
  return snap.docs.map(d => Usuario.fromJSON(d.data()));
}

export async function crearUsuario(req, res) {
    console.log("BODY RECIBIDO EN BACKEND:", req.body);
  try {
    const { nombre, email, password, rol } = req.body;

    if (!nombre || !email || !password || !rol) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    const userRecord = await admin.auth().createUser({
      email: email.trim(),
      password: password.trim()
    });

    const uid = userRecord.uid;

    try {
      const usuario = new Usuario(
        uid,
        nombre.trim(),
        rol.trim().toLowerCase()
      );

      await db.collection("usuarios").doc(uid).set({
        ...usuario.toJSON(),
        email: email.trim(),
        createdAt: new Date().toISOString()
      });

      return res.status(201).json({
        uid,
        nombre: usuario.nombre,
        email: email.trim(),
        rol: usuario.rol
      });

    } catch (dbError) {
      await admin.auth().deleteUser(uid);
      console.error(dbError);
      return res.status(500).json({ error: "Error guardando perfil" });
    }

  } catch (err) {
    console.error(err);

    if (err.code === "auth/email-already-exists") {
      return res.status(400).json({ error: "El email ya está registrado" });
    }

    if (err.code === "auth/invalid-password") {
      return res.status(400).json({ error: "La contraseña es inválida (mínimo 6 caracteres)" });
    }

    return res.status(500).json({ error: "No se pudo crear usuario" });
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

    await admin.auth().deleteUser(uid);
    await db.collection("usuarios").doc(uid).delete();

    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: "No se pudo eliminar usuario" });
  }
}
