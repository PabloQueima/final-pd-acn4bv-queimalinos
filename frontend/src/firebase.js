import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDzVTgYkUqF4lXsSWvpXzUor8le_hQNBfk",
  authDomain: "plataformas-de-entrenamiento.firebaseapp.com",
  projectId: "plataformas-de-entrenamiento",
  storageBucket: "plataformas-de-entrenamiento.firebasestorage.app",
  messagingSenderId: "678781356844",
  appId: "1:678781356844:web:f581ebb1973abc14d2ba89"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
