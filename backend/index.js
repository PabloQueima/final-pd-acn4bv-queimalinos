import express from "express";
import cors from "cors";
import morgan from "morgan";
import ejerciciosRouter from "./routes/ejercicios.routes.js";
import usuariosRouter from "./routes/usuarios.routes.js";
import sesionesRouter from "./routes/sesiones.routes.js";
import logger from "./middleware/logger.js";
import { ensureDataFiles } from "./utils/fileService.js";
import errorHandler from "./middleware/errorHandler.js";
import authRoutes from "./routes/authRoutes.js";

const PORT = process.env.PORT || 3000;
const app = express();

try {
  await ensureDataFiles();
} catch (err) {
  console.error("Error al inicializar archivos JSON:", err);
  process.exit(1);
}

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(morgan("dev"));
app.use(logger);

app.use("/api", authRoutes);
app.use("/api/ejercicios", ejerciciosRouter);
app.use("/api/usuarios", usuariosRouter);
app.use("/api/sesiones", sesionesRouter);

app.get("/health", (req, res) => res.json({ ok: true, time: new Date().toISOString() }));

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`API corriendo en http://localhost:${PORT}`);
});
