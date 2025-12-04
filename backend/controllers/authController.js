import { db } from "../firebase.js";
import bcrypt from "bcrypt";

export async function login(req, res) {
  const { nombre, password } = req.body;

  if (!nombre || !password) {
    return res.status(400).json({ error: "Faltan credenciales" });
  }

  try {
    // Buscar usuario en Firestore usando el campo "nombre"
    const snap = await db
      .collection("usuarios")
      .where("nombre", "==", nombre)
      .get();

    if (snap.empty) {
      return res.status(401).json({ error: "Usuario no encontrado" });
    }

    const found = snap.docs[0].data();

    // Comparar contraseña enviada vs hash almacenado
    const ok = await bcrypt.compare(password, found.passwordHash);

    if (!ok) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    return res.json({
      id: found.id,
      nombre: found.nombre,
      rol: found.rol
    });

  } catch (err) {
    console.error("Error en login:", err);
    return res.status(500).json({ error: "Error interno en el servidor" });
  }
}
