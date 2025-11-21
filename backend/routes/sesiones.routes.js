import { Router } from "express";
import {
  listarSesiones,
  crearSesion,
  actualizarSesion,
  eliminarSesion,
  sesionesPorCliente,
  sesionesPorEntrenador,
  agregarEjercicioASesion,
  eliminarEjercicioDeSesion
} from "../controllers/sesiones.controller.js";

import { validateSesion } from "../middleware/validateSesion.js";

const router = Router();

router.get("/cliente/:id", sesionesPorCliente);
router.get("/entrenador/:id", sesionesPorEntrenador);

router.get("/", listarSesiones);
router.post("/", validateSesion, crearSesion);
router.put("/:id", validateSesion, actualizarSesion);
router.delete("/:id", eliminarSesion);

router.post("/:id/ejercicios", agregarEjercicioASesion);
router.delete("/:id/ejercicios/:ejercicioId", eliminarEjercicioDeSesion);

export default router;
