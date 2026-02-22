import dotenv from "dotenv";
dotenv.config();
import admin from "firebase-admin";
import fs from "fs";


const serviceAccount = JSON.parse(
  fs.readFileSync(new URL("./firebase-key.json", import.meta.url))
);

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  }),
});

export const db = admin.firestore();
