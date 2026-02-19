import express from "express";
import cors from "cors";
import morgan from "morgan";

import ejerciciosRouter from "./routes/ejercicios.routes.js";
import usuariosRouter from "./routes/usuarios.routes.js";
import sesionesRouter from "./routes/sesiones.routes.js";
import authRoutes from "./routes/authRoutes.js";

import logger from "./middleware/logger.js";
import errorHandler from "./middleware/errorHandler.js";
import authMiddleware from "./middleware/authMiddleware.js";

import { ensureDataFiles } from "./utils/fileService.js";

const PORT = process.env.PORT || 3000;
const app = express();

/* Inicialización */
await ensureDataFiles();

/* Middlewares globales */
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(morgan("dev"));
app.use(logger);

/* Rutas públicas */
app.use("/api", authRoutes);

/* Middleware de autenticación */
app.use(authMiddleware);

/* Rutas protegidas */
app.use("/api/ejercicios", ejerciciosRouter);
app.use("/api/usuarios", usuariosRouter);
app.use("/api/sesiones", sesionesRouter);

/* Health check */
app.get("/health", (req, res) =>
  res.json({ ok: true, time: new Date().toISOString() })
);

/* Manejo global de errores */
app.use(errorHandler);

/* Servidor */
app.listen(PORT, () => {
  console.log(`API corriendo en http://localhost:${PORT}`);
});
