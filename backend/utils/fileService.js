import { db } from "../firebase.js";

/**
 * Mapea los nombres de archivos a colecciones de Firestore
 */
const COLLECTION_MAP = {
  "usuarios.json": "usuarios",
  "ejercicios.json": "ejercicios",
  "sesiones.json": "sesiones"
};

/**
 * Ya no se necesitan archivos físicos.
 */
export const ensureDataFiles = async () => {
  console.log("[fileService] Firebase mode: no local files needed.");
};

/**
 * Lee desde Firestore en vez de JSON local
 */
export const readJSON = async (filename) => {
  const collectionName = COLLECTION_MAP[filename];

  if (!collectionName) {
    throw new Error(`No se encuentra la colección para: ${filename}`);
  }

  try {
    const snap = await db.collection(collectionName).get();
    return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  } catch (err) {
    console.error(`[fileService] Error leyendo Firestore (${collectionName}):`, err);
    throw err;
  }
};

/**
 * Escribe un array completo en Firestore (sobrescribe la colección)
 */
export const writeJSON = async (filename, data) => {
  const collectionName = COLLECTION_MAP[filename];

  if (!collectionName) {
    throw new Error(`No se encuentra la colección para: ${filename}`);
  }

  if (!Array.isArray(data)) {
    throw new Error(`writeJSON requiere un array. Recibido: ${typeof data}`);
  }

  try {
    // 1. Borrar colección actual
    const snap = await db.collection(collectionName).get();
    const batchDelete = db.batch();

    snap.forEach((doc) => batchDelete.delete(doc.ref));

    await batchDelete.commit();

    // 2. Escribir nueva data
    const batchWrite = db.batch();

    data.forEach((item) => {
      const ref = db.collection(collectionName).doc(item.id || undefined);
      batchWrite.set(ref, item);
    });

    await batchWrite.commit();

    console.log(`[fileService] Firestore actualizado: ${collectionName}`);

  } catch (err) {
    console.error(`[fileService] Error escribiendo Firestore (${collectionName}):`, err);
    throw err;
  }
};
