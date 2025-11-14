import { Router } from "express";
import { listarSesiones, crearSesion, actualizarSesion, eliminarSesion } from "../controllers/sesiones.controller.js";

const router = Router();

router.get("/", listarSesiones);
router.post("/", crearSesion);
router.put("/:id", actualizarSesion);
router.delete("/:id", eliminarSesion);

export default router;
