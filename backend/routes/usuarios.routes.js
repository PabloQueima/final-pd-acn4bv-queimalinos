import { Router } from "express";
import {
  listarUsuarios,
  obtenerUsuario,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario
} from "../controllers/usuarios.controller.js";
import { validateUsuario } from "../middleware/validateUsuario.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

router.use(authMiddleware);

router.get("/", listarUsuarios);
router.get("/:uid", obtenerUsuario);
router.post("/", validateUsuario, crearUsuario);
router.put("/:uid", actualizarUsuario);
router.delete("/:uid", eliminarUsuario);

export default router;
