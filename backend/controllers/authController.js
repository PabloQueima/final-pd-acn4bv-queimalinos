import admin from "firebase-admin";
import { db } from "../firebase.js";

export async function login(req, res) {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: "Token requerido" });
  }

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    const uid = decoded.uid;

    const doc = await db.collection("usuarios").doc(uid).get();

    if (!doc.exists) {
      return res.status(404).json({ error: "Perfil no encontrado" });
    }

    const data = doc.data();

    res.json({
      user: {
        uid,
        nombre: data.nombre,
        email: data.email,
        rol: data.rol
      }
    });
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Token inválido" });
  }
}

export async function register(req, res) {
  const { token, nombre } = req.body;

  if (!token || !nombre) {
    return res.status(400).json({ error: "Token y nombre requeridos" });
  }

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    const uid = decoded.uid;
    const email = decoded.email;

    const ref = db.collection("usuarios").doc(uid);
    const existing = await ref.get();

    if (existing.exists) {
      return res.status(400).json({ error: "Usuario ya registrado" });
    }

    const nuevo = {
      uid,
      nombre: nombre.trim(),
      email,
      rol: "cliente",
      createdAt: new Date().toISOString()
    };

    await ref.set(nuevo);

    res.status(201).json({
      user: {
        uid,
        nombre: nuevo.nombre,
        email: nuevo.email,
        rol: nuevo.rol
      }
    });
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Token inválido" });
  }
}
