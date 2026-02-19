import express from "express";
import * as controller from "../controllers/ejercicios.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  validateCreateEjercicio,
  validateUpdateEjercicio
} from "../middleware/validateEjercicio.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", controller.listarEjercicios);
router.post("/", validateCreateEjercicio, controller.crearEjercicio);
router.put("/:id", validateUpdateEjercicio, controller.actualizarEjercicio);
router.delete("/:id", controller.eliminarEjercicio);
router.get("/buscar", controller.buscarEjercicios);
router.get("/:id", controller.obtenerEjercicio);

export default router;
