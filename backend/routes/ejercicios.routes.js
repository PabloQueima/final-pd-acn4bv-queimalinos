import express from "express";
import * as controller from "../controllers/ejercicios.controller.js";
import { validateEjercicio } from "../middleware/validateEjercicio.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", controller.listarEjercicios);
router.post("/", validateEjercicio, controller.crearEjercicio);
router.put("/:id", validateEjercicio, controller.actualizarEjercicio);
router.delete("/:id", controller.eliminarEjercicio);
router.get("/buscar", controller.buscarEjercicios);
router.get("/:id", controller.obtenerEjercicio);

export default router;
