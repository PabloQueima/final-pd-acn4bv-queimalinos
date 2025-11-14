import express from "express";
import * as controller from "../controllers/ejercicios.controller.js";

const router = express.Router();

router.get("/", controller.listarEjercicios);
router.post("/", controller.crearEjercicio);
router.put("/:id", controller.actualizarEjercicio);
router.delete("/:id", controller.eliminarEjercicio);

export default router;
