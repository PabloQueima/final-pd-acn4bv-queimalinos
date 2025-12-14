import admin from "firebase-admin";

export async function authMiddleware(req, res, next) {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ error: "Falta token" });
  }

  const [type, token] = header.split(" ");

  if (type !== "Bearer" || !token) {
    return res.status(401).json({ error: "Formato de autorización inválido" });
  }

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = {
      uid: decoded.uid,
      email: decoded.email
    };
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token Firebase inválido" });
  }
}
