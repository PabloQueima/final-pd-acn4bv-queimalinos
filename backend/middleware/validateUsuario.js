import { z } from "zod";

const rolesValidos = ["admin", "entrenador", "cliente"];

// ---------- CREATE ----------

const createSchema = z.object({
  nombre: z
    .string()
    .min(1, "El nombre no puede estar vacío.")
    .max(100, "El nombre no puede superar 100 caracteres.")
    .trim(),

  email: z
    .string()
    .email("Email inválido.")
    .trim(),

  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres."),

  rol: z
    .string()
    .toLowerCase()
    .refine(val => rolesValidos.includes(val), {
      message: "Rol inválido."
    })
}).strict();

// ---------- UPDATE ----------

const updateSchema = z.object({
  nombre: z
    .string()
    .min(1, "El nombre no puede estar vacío.")
    .max(100, "El nombre no puede superar 100 caracteres.")
    .trim()
    .optional(),

  email: z
    .string()
    .email("Email inválido.")
    .trim()
    .optional(),

  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres.")
    .optional(),

  rol: z
    .string()
    .toLowerCase()
    .refine(val => rolesValidos.includes(val), {
      message: "Rol inválido."
    })
    .optional()
});

export function validateCreateUsuario(req, res, next) {
  try {
    req.body = createSchema.parse(req.body);
    next();
  } catch (err) {
    return res.status(400).json({
      error: err.errors?.[0]?.message || "Datos inválidos."
    });
  }
}

export function validateUpdateUsuario(req, res, next) {
  try {
    req.body = updateSchema.parse(req.body);
    next();
  } catch (err) {
    console.error("ERROR VALIDACION UPDATE:", err.errors);
    return res.status(400).json({
      error: err.errors?.[0]?.message || "Datos inválidos."
    });
  }
}
