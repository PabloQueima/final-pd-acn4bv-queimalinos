import { Router } from "express";
import { listarSesiones, crearSesion, actualizarSesion, eliminarSesion } from "../controllers/sesiones.controller.js";
import { validateSesion } from "../middleware/validateSesion.js";

const router = Router();

router.get("/", listarSesiones);
router.post("/", validateSesion, crearSesion);
router.put("/:id", validateSesion, actualizarSesion);
router.delete("/:id", eliminarSesion);

export default router;
