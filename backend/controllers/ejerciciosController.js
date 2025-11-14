import { readJSON, writeJSON } from "../utils/fileService.js";
import { v4 as uuidv4 } from "uuid";

const FILE = "ejercicios.json";

// listar
export async function listarEjercicios(req, res) {
  try {
    const ejercicios = await readJSON(FILE);
    res.json(ejercicios);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "No se pudieron leer ejercicios" });
  }
}

// validación simple como función reutilizable
function validarEjercicioPayload(body) {
  if (!body || typeof body !== "object") return "Payload inválido";
  if (!body.nombre || typeof body.nombre !== "string") return "Falta campo 'nombre' (string)";
  if (!body.descripcion || typeof body.descripcion !== "string") return "Falta campo 'descripcion' (string)";
  return null;
}

// POST
export async function validarYCrearEjercicio(req, res) {
  try {
    const errMsg = validarEjercicioPayload(req.body);
    if (errMsg) return res.status(400).json({ error: errMsg });

    const ejercicios = await readJSON(FILE);

    const nuevo = {
      id: uuidv4(),
      nombre: req.body.nombre.trim(),
      descripcion: req.body.descripcion.trim(),
      createdAt: new Date().toISOString()
    };

    ejercicios.push(nuevo);
    await writeJSON(FILE, ejercicios);

    res.status(201).json(nuevo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "No se pudo crear ejercicio" });
  }
}
