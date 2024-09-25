// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyCO6KU6o8K6XGLpp5-EIWoAmGf4beBnUEo",
  authDomain: "ecommerce-web-app-6476b.firebaseapp.com",
  projectId: "ecommerce-web-app-6476b",
  storageBucket: "ecommerce-web-app-6476b.appspot.com",
  messagingSenderId: "361819883157",
  appId: "1:361819883157:web:a707ee6a8285334a28fd9c",
  measurementId: "G-7GXFJFN1KX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Google Auth Provider
const provider = new GoogleAuthProvider();

// Function to handle Google Sign-In and saving the user in Firestore


// Export the initialized Firebase app and services
export { auth, db, storage, provider };