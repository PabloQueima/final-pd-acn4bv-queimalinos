import admin from "firebase-admin";

const authMiddleware = async (req, res, next) => {
  try {
    const header = req.headers.authorization;

    if (!header) {
      const error = new Error("Falta token de autorización");
      error.status = 401;
      throw error;
    }

    const [type, token] = header.split(" ");

    if (type !== "Bearer" || !token) {
      const error = new Error("Formato de autorización inválido");
      error.status = 401;
      throw error;
    }

    const decodedToken = await admin.auth().verifyIdToken(token);

    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      role: decodedToken.role || null
    };

    next();

  } catch (err) {
    err.status = 401;
    next(err);
  }
};

export default authMiddleware;
