import { readJSON, writeJSON } from "../utils/fileService.js";

const FILE = "ejercicios.json";

export async function listarEjercicios(req, res) {
  try {
    const ejercicios = await readJSON(FILE);
    res.json(ejercicios);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "No se pudieron leer ejercicios" });
  }
}

export async function crearEjercicio(req, res) {
  try {
    const { nombre, descripcion } = req.body;

    if (!nombre || !nombre.trim()) {
      return res.status(400).json({ error: "Campo 'nombre' obligatorio" });
    }

    const ejercicios = await readJSON(FILE);

    const nuevo = {
      id: Date.now().toString(),
      nombre: nombre.trim(),
      descripcion: descripcion || "",
      createdAt: new Date().toISOString(),
    };

    ejercicios.push(nuevo);
    await writeJSON(FILE, ejercicios);

    res.status(201).json(nuevo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "No se pudo crear ejercicio" });
  }
}

export async function actualizarEjercicio(req, res) {
  try {
    const id = req.params.id;
    const { nombre, descripcion } = req.body;

    if (nombre !== undefined && !nombre.trim()) {
      return res.status(400).json({ error: "El nombre no puede estar vacío" });
    }

    let ejercicios = await readJSON(FILE);
    const idx = ejercicios.findIndex((e) => e.id === id);
    if (idx === -1) return res.status(404).json({ error: "Ejercicio no encontrado" });

    ejercicios[idx] = {
      ...ejercicios[idx],
      nombre: nombre ?? ejercicios[idx].nombre,
      descripcion: descripcion ?? ejercicios[idx].descripcion,
      updatedAt: new Date().toISOString(),
    };

    await writeJSON(FILE, ejercicios);
    res.json(ejercicios[idx]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "No se pudo actualizar ejercicio" });
  }
}

export async function eliminarEjercicio(req, res) {
  try {
    const id = req.params.id;
    let ejercicios = await readJSON(FILE);
    const exists = ejercicios.some((e) => e.id === id);
    if (!exists) return res.status(404).json({ error: "Ejercicio no encontrado" });

    ejercicios = ejercicios.filter((e) => e.id !== id);
    await writeJSON(FILE, ejercicios);

    res.json({ message: "Ejercicio eliminado correctamente", id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "No se pudo eliminar ejercicio" });
  }
}
