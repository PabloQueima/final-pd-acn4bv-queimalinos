import admin from "firebase-admin";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const serviceAccount = JSON.parse(
  await fs.readFile(path.join(__dirname, "../firebase-key.json"), "utf-8")
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function subirUsuarios() {
  try {
    const filePath = path.join(__dirname, "../data/usuarios.json");
    const raw = await fs.readFile(filePath, "utf-8");
    const usuarios = JSON.parse(raw);

    const batch = db.batch();
    const colRef = db.collection("usuarios");

    usuarios.forEach(u => {
      const docRef = colRef.doc(String(u.id));
      batch.set(docRef, u);
    });

    await batch.commit();
    console.log("Usuarios subidos correctamente.");
  } catch (err) {
    console.error("Error subiendo usuarios:", err);
  }
}

subirUsuarios();
