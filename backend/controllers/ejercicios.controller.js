import { db } from "../firebase.js";
import Ejercicio from "../models/Ejercicio.js";


async function fetchEjercicios() {
  const snap = await db.collection("ejercicios").get();
  return snap.docs.map(d => Ejercicio.fromJSON(d.data()));
}

async function findEjercicioById(id) {
  const snap = await db
    .collection("ejercicios")
    .where("id", "==", id)
    .limit(1)
    .get();

  if (snap.empty) return null;

  return {
    ref: snap.docs[0].ref,
    data: Ejercicio.fromJSON(snap.docs[0].data())
  };
}

function validateId(idParam) {
  const id = Number(idParam);
  if (Number.isNaN(id)) return null;
  return id;
}


export async function listarEjercicios(req, res) {
  try {
    const ejercicios = await fetchEjercicios();
    res.json(ejercicios.map(e => e.toJSON()));
  } catch (err) {
    console.error("listarEjercicios:", err);
    res.status(500).json({ error: "No se pudieron leer ejercicios" });
  }
}

export async function crearEjercicio(req, res) {
  try {
    const { nombre, descripcion, parteCuerpo, elemento, imageUrl } = req.body;

    const nuevo = new Ejercicio(
      Date.now(),
      nombre,
      descripcion || "",
      parteCuerpo ? parteCuerpo.toLowerCase() : "",
      elemento ? elemento.toLowerCase() : "",
      imageUrl || ""
    );

    await db.collection("ejercicios").add(nuevo.toJSON());

    res.status(201).json(nuevo.toJSON());
  } catch (err) {
    console.error("crearEjercicio:", err);
    res.status(500).json({ error: "No se pudo crear ejercicio" });
  }
}

export async function actualizarEjercicio(req, res) {
  try {
    const id = validateId(req.params.id);
    if (!id) return res.status(400).json({ error: "ID inválido" });

    const result = await findEjercicioById(id);
    if (!result)
      return res.status(404).json({ error: "Ejercicio no encontrado" });

    const { ref, data: ejercicio } = result;
    const updates = req.body;

    if (updates.nombre !== undefined)
      ejercicio.nombre = updates.nombre;

    if (updates.descripcion !== undefined)
      ejercicio.descripcion = updates.descripcion;

    if (updates.parteCuerpo !== undefined)
      ejercicio.parteCuerpo = updates.parteCuerpo.toLowerCase();

    if (updates.elemento !== undefined)
      ejercicio.elemento = updates.elemento.toLowerCase();

    if (updates.imageUrl !== undefined)
      ejercicio.imageUrl = updates.imageUrl;

    await ref.update(ejercicio.toJSON());

    res.json(ejercicio.toJSON());
  } catch (err) {
    console.error("actualizarEjercicio:", err);
    res.status(500).json({ error: "No se pudo actualizar ejercicio" });
  }
}

export async function eliminarEjercicio(req, res) {
  try {
    const id = validateId(req.params.id);
    if (!id) return res.status(400).json({ error: "ID inválido" });

    const result = await findEjercicioById(id);
    if (!result)
      return res.status(404).json({ error: "Ejercicio no encontrado" });

    await result.ref.delete();
    res.status(204).end();
  } catch (err) {
    console.error("eliminarEjercicio:", err);
    res.status(500).json({ error: "No se pudo eliminar ejercicio" });
  }
}

export async function obtenerEjercicio(req, res) {
  try {
    const id = validateId(req.params.id);
    if (!id) return res.status(400).json({ error: "ID inválido" });

    const result = await findEjercicioById(id);
    if (!result)
      return res.status(404).json({ error: "Ejercicio no encontrado" });

    res.json(result.data.toJSON());
  } catch (err) {
    console.error("obtenerEjercicio:", err);
    res.status(500).json({ error: "No se pudo obtener ejercicio" });
  }
}

export async function buscarEjercicios(req, res) {
  try {
    const { parte, search } = req.query;

    let ejercicios = await fetchEjercicios();

    if (parte) {
      const p = parte.toLowerCase();
      ejercicios = ejercicios.filter(
        e => (e.parteCuerpo || "").includes(p)
      );
    }

    if (search) {
      const s = search.toLowerCase();
      ejercicios = ejercicios.filter(
        e =>
          (e.nombre || "").toLowerCase().includes(s) ||
          (e.descripcion || "").toLowerCase().includes(s)
      );
    }

    res.json(ejercicios.map(e => e.toJSON()));
  } catch (err) {
    console.error("buscarEjercicios:", err);
    res.status(500).json({ error: "Error al buscar ejercicios" });
  }
}
