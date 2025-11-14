import express from "express";
import * as controller from "../controllers/ejerciciosController.js";

const router = express.Router();

// GET /api/ejercicios
router.get("/", controller.listarEjercicios);

// POST /api/ejercicios
router.post("/", controller.validarYCrearEjercicio);

// (más adelante: PUT, DELETE)
export default router;
