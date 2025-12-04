import admin from "firebase-admin";
import fs from "fs";
import bcrypt from "bcrypt";

const serviceAccount = JSON.parse(
  fs.readFileSync(new URL("../firebase-key.json", import.meta.url))
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// === Usuarios con contraseña ORIGINAL ===
const usuariosOriginales = [
  {
    id: 1,
    nombre: "Admin",
    rol: "admin",
    password: "admin123",
    createdAt: "2025-01-01T00:00:00Z"
  },
  {
    id: 201,
    nombre: "Lucas Trainer",
    rol: "entrenador",
    password: "trainer123",
    createdAt: "2025-01-01T00:10:00Z"
  },
  {
    id: 202,
    nombre: "Mariana Coach",
    rol: "entrenador",
    password: "trainer123",
    createdAt: "2025-01-01T00:20:00Z"
  },
  {
    id: 101,
    nombre: "Juan Cliente",
    rol: "cliente",
    password: "cliente123",
    createdAt: "2025-01-01T01:00:00Z"
  },
  {
    id: 102,
    nombre: "Ana Cliente",
    rol: "cliente",
    password: "cliente123",
    createdAt: "2025-01-01T01:10:00Z"
  },
  {
    id: 103,
    nombre: "Pedro Cliente",
    rol: "cliente",
    password: "cliente123",
    createdAt: "2025-01-01T01:20:00Z"
  },
  {
    id: 104,
    nombre: "Lucía Cliente",
    rol: "cliente",
    password: "cliente123",
    createdAt: "2025-01-01T01:30:00Z"
  },
  {
    id: 203,
    nombre: "Pepe Coach",
    rol: "entrenador",
    password: "pepe123",
    createdAt: "2025-01-01T02:00:00Z"
  },
  {
    id: 105,
    nombre: "Pedro Cliente",
    rol: "cliente",
    password: "pedro123",
    createdAt: "2025-01-01T02:10:00Z"
  }
];

async function resetUsuarios() {
  console.log("Borrando colección 'usuarios'...");
  const snap = await db.collection("usuarios").get();
  const batch = db.batch();

  snap.forEach(doc => batch.delete(doc.ref));
  await batch.commit();
  console.log("Colección vaciada.\n");

  console.log("Generando hashes y subiendo usuarios...");

  for (const u of usuariosOriginales) {
    const hash = await bcrypt.hash(u.password, 10);

    await db.collection("usuarios").doc(String(u.id)).set({
      id: u.id,
      nombre: u.nombre,
      rol: u.rol.toLowerCase(),
      passwordHash: hash,
      createdAt: u.createdAt,
    });

    console.log(`✔ Usuario subido: ${u.nombre} (${u.rol})`);
  }

  console.log("\nTodos los usuarios fueron reseteados correctamente.");
  process.exit(0);
}

resetUsuarios().catch(err => {
  console.error("Error:", err);
  process.exit(1);
});
