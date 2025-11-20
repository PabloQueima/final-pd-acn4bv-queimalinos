import { readJSON, writeJSON } from "../utils/fileService.js";
import Ejercicio from "../models/Ejercicio.js";

const FILE = "ejercicios.json";

export async function listarEjercicios(req, res) {
  try {
    const data = await readJSON(FILE);
    const ejercicios = data.map(e => Ejercicio.fromJSON(e));
    res.json(ejercicios.map(e => e.toJSON()));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "No se pudieron leer ejercicios" });
  }
}

export async function crearEjercicio(req, res) {
  try {
    const { nombre, descripcion, parteCuerpo, elemento } = req.body;

    const data = await readJSON(FILE);

    const nuevo = new Ejercicio(
      Date.now(),
      nombre,
      descripcion,
      parteCuerpo,
      elemento
    );

    data.push(nuevo.toJSON());
    await writeJSON(FILE, data);

    res.status(201).json(nuevo.toJSON());
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "No se pudo crear ejercicio" });
  }
}

export async function actualizarEjercicio(req, res) {
  try {
    const id = Number(req.params.id);
    const data = await readJSON(FILE);
    let ejercicios = data.map(e => Ejercicio.fromJSON(e));

    const idx = ejercicios.findIndex(e => e.id === id);
    if (idx === -1) return res.status(404).json({ error: "Ejercicio no encontrado" });

    const { nombre, descripcion, parteCuerpo, elemento } = req.body;
    const ejercicio = ejercicios[idx];

    if (nombre !== undefined) ejercicio.nombre = nombre.trim();
    if (descripcion !== undefined) ejercicio.descripcion = descripcion.trim();
    if (parteCuerpo !== undefined) ejercicio.parteCuerpo = parteCuerpo.trim().toLowerCase();
    if (elemento !== undefined) ejercicio.elemento = elemento.trim().toLowerCase();

    ejercicios[idx] = ejercicio;

    await writeJSON(FILE, ejercicios.map(e => e.toJSON()));

    res.json(ejercicio.toJSON());
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "No se pudo actualizar ejercicio" });
  }
}

export async function eliminarEjercicio(req, res) {
  try {
    const id = Number(req.params.id);
    let data = await readJSON(FILE);
    const exists = data.some(e => Number(e.id) === id);

    if (!exists) return res.status(404).json({ error: "Ejercicio no encontrado" });

    data = data.filter(e => Number(e.id) !== id);
    await writeJSON(FILE, data);

    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "No se pudo eliminar ejercicio" });
  }
}
