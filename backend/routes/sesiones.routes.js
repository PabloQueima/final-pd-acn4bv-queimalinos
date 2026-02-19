import { Router } from "express";
import {
  listarSesiones,
  obtenerSesion,
  crearSesion,
  actualizarSesion,
  eliminarSesion,
  sesionesPorCliente,
  sesionesPorEntrenador,
  agregarEjercicioASesion,
  eliminarEjercicioDeSesion
} from "../controllers/sesiones.controller.js";

import { validateSesion } from "../middleware/validateSesion.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

router.use(authMiddleware);

router.get("/cliente/:uid", sesionesPorCliente);
router.get("/entrenador/:uid", sesionesPorEntrenador);
router.get("/", listarSesiones);
router.get("/:id", obtenerSesion);
router.post("/", validateSesion, crearSesion);
router.put("/:id", validateSesion, actualizarSesion);
router.delete("/:id", eliminarSesion);
router.post("/:id/ejercicios", agregarEjercicioASesion);
router.delete("/:id/ejercicios/:ejercicioId", eliminarEjercicioDeSesion);

export default router;
