export default function errorHandler(err, req, res, next) {
  console.error("[ERROR]", err);

  if (res.headersSent) {
    return next(err);
  }

  res.status(500).json({
    error: "Error interno del servidor",
    detalle: err?.message || "Error desconocido"
  });
}
