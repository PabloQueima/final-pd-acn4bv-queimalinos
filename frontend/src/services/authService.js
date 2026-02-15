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

  const cred = await signInWithEmailAndPassword(auth, email, password);
  const uid = cred.user.uid;

  const snap = await getDoc(doc(db, "usuarios", uid));

  if (!snap.exists()) {
    throw new Error("Usuario sin datos en Firestore");
  }

  return {
    uid,
    ...snap.data()
  };
}

export async function register(nombre, email, password) {
  const auth = getAuth();
  const db = getFirestore();

  const cred = await createUserWithEmailAndPassword(auth, email, password);
  const uid = cred.user.uid;

  await setDoc(doc(db, "usuarios", uid), {
    nombre,
    email,
    rol: "cliente",
    createdAt: new Date().toISOString()
  });

  return {
    uid,
    nombre,
    email,
    rol: "cliente"
  };
}

export async function logout() {
  const auth = getAuth();
  await signOut(auth);
}
