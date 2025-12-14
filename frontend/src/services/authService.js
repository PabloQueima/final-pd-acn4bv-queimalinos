import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

export async function login(email, password) {
  const auth = getAuth();
  const db = getFirestore();

  const cred = await signInWithEmailAndPassword(auth, email, password);
  const uid = cred.user.uid;

  const snap = await getDoc(doc(db, "usuarios", uid));
  const userData = snap.exists() ? snap.data() : null;

  localStorage.setItem("user", JSON.stringify({ uid, ...userData }));

  return { uid, ...userData };
}

export async function register(nombre, email, password) {
  const auth = getAuth();
  const db = getFirestore();

  const cred = await createUserWithEmailAndPassword(auth, email, password);
  const uid = cred.user.uid;

  const userData = {
    nombre,
    email,
    rol: "cliente",
    createdAt: new Date().toISOString()
  };

  await setDoc(doc(db, "usuarios", uid), userData);

  localStorage.setItem("user", JSON.stringify({ uid, ...userData }));

  return { uid, ...userData };
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
