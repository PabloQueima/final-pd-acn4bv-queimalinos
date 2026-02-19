import { z } from "zod";

const baseSchema = z.object({
  nombre: z
    .string()
    .min(1, "El campo 'nombre' no puede estar vacío.")
    .max(100, "El campo 'nombre' no puede superar 100 caracteres.")
    .trim(),

  descripcion: z
    .string()
    .max(500, "La descripción no puede superar 500 caracteres.")
    .trim(),

  parteCuerpo: z
    .string()
    .max(100, "El campo 'parteCuerpo' no puede superar 100 caracteres.")
    .trim(),

  elemento: z
    .string()
    .max(100, "El campo 'elemento' no puede superar 100 caracteres.")
    .trim(),

  imageUrl: z
    .string()
    .url("El campo 'imageUrl' debe ser una URL válida.")
}).strict();

const createSchema = baseSchema.extend({
  nombre: baseSchema.shape.nombre
});

const updateSchema = baseSchema.partial();

export function validateCreateEjercicio(req, res, next) {
  try {
    req.body = createSchema.parse(req.body);
    next();
  } catch (error) {
    return res.status(400).json({
      error: error.errors?.[0]?.message || "Datos inválidos."
    });
  }
}

export function validateUpdateEjercicio(req, res, next) {
  try {
    req.body = updateSchema.parse(req.body);
    next();
  } catch (error) {
    return res.status(400).json({
      error: error.errors?.[0]?.message || "Datos inválidos."
    });
  }
}
