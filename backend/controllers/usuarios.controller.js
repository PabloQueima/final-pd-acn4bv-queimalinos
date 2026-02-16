import admin from "firebase-admin";
import { db } from "../firebase.js";
import Usuario from "../models/Usuario.js";

async function fetchUsuarios() {
  const snap = await db.collection("usuarios").get();

  return snap.docs.map(d => {
    const data = d.data();

    return new Usuario(
      d.id,
      data.nombre,
      data.email,
      data.rol,
      data.createdAt
    );
  });
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
        email.trim(),
        rol.trim().toLowerCase()
      );

      await db.collection("usuarios").doc(uid).set(usuario.toJSON());

      return res.status(201).json({
        uid: usuario.uid,
        nombre: usuario.nombre,
        email: usuario.email,
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
      return res.status(400).json({
        error: "La contraseña es inválida (mínimo 6 caracteres)"
      });
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

    res.json(
      usuarios.map(u => ({
        uid: u.uid,
        nombre: u.nombre,
        rol: u.rol,
        email: u.email || ""
      }))
    );
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

    const data = doc.data();
    const usuario = new Usuario(
      doc.id,
      data.nombre,
      data.email,
      data.rol,
      data.createdAt
    );

    res.json(usuario.toJSON());

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

    const updates = {};

    if (nombre !== undefined) {
      updates.nombre = nombre.trim();
    }

    if (rol !== undefined) {
      updates.rol = rol.trim().toLowerCase();
    }

    await ref.update(updates);

    const updatedDoc = await ref.get();
    const data = updatedDoc.data();

    const usuario = new Usuario(
      updatedDoc.id,
      data.nombre,
      data.email,
      data.rol,
      data.createdAt
    );

    res.json(usuario.toJSON());

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
    console.error("Error eliminando usuario:", err);
    res.status(500).json({ error: "No se pudo eliminar usuario" });
  }
}
