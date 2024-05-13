/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGhqLEeMrrni_eufSptdgDVUD-llCGr0U",
  authDomain: "proyectobarberia-981f5.firebaseapp.com",
  projectId: "proyectobarberia-981f5",
  storageBucket: "proyectobarberia-981f5.appspot.com",
  messagingSenderId: "399505533102",
  appId: "1:399505533102:web:eab1e3731840e0bc9ca53f",
  measurementId: "G-M1D37Y8WLT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;