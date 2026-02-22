import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from "firebase/auth";

import {
  getFirestore,
  doc,
  setDoc,
  getDoc
} from "firebase/firestore";

  export async function login(email, password) {
    const auth = getAuth();
    const db = getFirestore();

    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const uid = cred.user.uid;

      const snap = await getDoc(doc(db, "usuarios", uid));
      const userData = snap.exists() ? snap.data() : null;

      if (!userData) {
        throw new Error("Usuario sin datos en Firestore.");
      }

      localStorage.setItem("user", JSON.stringify({ uid, ...userData }));

      return { uid, ...userData };

    } catch (error) {

      let mensaje;

      switch (error.code) {
        case "auth/user-not-found":
          mensaje = "No existe una cuenta con ese email.";
          break;

        case "auth/wrong-password":
        case "auth/invalid-credential":
          mensaje = "Credenciales incorrectas.";
          break;

        case "auth/invalid-email":
          mensaje = "El email ingresado no es válido.";
          break;

        case "auth/too-many-requests":
          mensaje = "Demasiados intentos. Intente más tarde.";
          break;

        default:
          mensaje = error.message || "Error al iniciar sesión.";
      }

      throw new Error(mensaje);
    }
  }



  export async function register(nombre, email, password) {
    const auth = getAuth();
    const db = getFirestore();

    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      const uid = cred.user.uid;

      const userData = {
        uid,
        nombre: nombre.trim(),
        email: email.trim(),
        rol: "cliente",
        createdAt: new Date().toISOString()
      };

      await setDoc(doc(db, "usuarios", uid), userData);

      localStorage.setItem("user", JSON.stringify(userData));

      return userData;

    } catch (error) {

      let mensaje;

      switch (error.code) {
        case "auth/email-already-in-use":
          mensaje = "Ya existe una cuenta registrada con ese email.";
          break;

        case "auth/invalid-email":
          mensaje = "El email ingresado no es válido.";
          break;

        case "auth/weak-password":
          mensaje = "La contraseña debe tener al menos 6 caracteres.";
          break;

        default:
          mensaje = error.message || "Error al registrar usuario.";
      }

      throw new Error(mensaje);
    }
  }



  export async function logout() {
    const auth = getAuth();
    await signOut(auth);
    localStorage.removeItem("user");
  }

  export function getCurrentUser() {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  }
