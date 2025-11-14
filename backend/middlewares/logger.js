export default function logger(req, res, next) {
  const now = new Date().toISOString();
  console.log(`[LOGGER] ${now} - ${req.method} ${req.originalUrl}`);
  next();
}
