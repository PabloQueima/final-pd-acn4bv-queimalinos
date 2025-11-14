import { Router } from "express";
import { listarUsuarios, crearUsuario, actualizarUsuario, eliminarUsuario } from "../controllers/usuarios.controller.js";

const router = Router();

router.get("/", listarUsuarios);
router.post("/", crearUsuario);
router.put("/:id", actualizarUsuario);
router.delete("/:id", eliminarUsuario);

export default router;
