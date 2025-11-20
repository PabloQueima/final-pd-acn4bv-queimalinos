import { Router } from "express";
import { listarUsuarios, crearUsuario, actualizarUsuario, eliminarUsuario } from "../controllers/usuarios.controller.js";
import { validateUsuario } from "../middleware/validateUsuario.js";

const router = Router();

router.get("/", listarUsuarios);
router.post("/", validateUsuario, crearUsuario);
router.put("/:id", validateUsuario, actualizarUsuario);
router.delete("/:id", eliminarUsuario);

export default router;
