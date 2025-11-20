import express from "express";
import * as controller from "../controllers/ejercicios.controller.js";
import { validateEjercicio } from "../middleware/validateEjercicio.js";

const router = express.Router();

router.get("/", controller.listarEjercicios);
router.post("/", validateEjercicio, controller.crearEjercicio);
router.put("/:id", validateEjercicio, controller.actualizarEjercicio);
router.delete("/:id", controller.eliminarEjercicio);

export default router;
