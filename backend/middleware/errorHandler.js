export default function errorHandler(err, req, res, next) {
  console.error("[ERROR]", err);

  if (res.headersSent) {
    return next(err);
  }

  const status = err.status || err.statusCode || 500;

  res.status(status).json({
    error: err.message || "Error interno del servidor"
  });
}
