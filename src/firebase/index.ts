// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Funcionando
const firebaseConfig = {
  apiKey: "AIzaSyCP_ZHWmEdVVO1pVjrIiV4iHwGy7Koumqs",
  authDomain: "encuesta-fiis-9fa35.firebaseapp.com",
  projectId: "encuesta-fiis-9fa35",
  storageBucket: "encuesta-fiis-9fa35.appspot.com",
  messagingSenderId: "981205668237",
  appId: "1:981205668237:web:21ae7a2e2885fb05b8edc4",
  measurementId: "G-ZJ482QE352"
};

// Initialize Firebase
export const FireBaseApp = initializeApp(firebaseConfig);
export const FireBaseGetAuth = getAuth(FireBaseApp);
export const FireBaseGetStore = getFirestore(FireBaseApp);
