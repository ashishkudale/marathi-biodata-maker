// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4kWL5F5dig5g2EmicxXlJmC-4oFQKn4I",
  authDomain: "resume-maker-55067.firebaseapp.com",
  projectId: "resume-maker-55067",
  storageBucket: "resume-maker-55067.firebasestorage.app",
  messagingSenderId: "794306082085",
  appId: "1:794306082085:web:7b2fbc3af4549186d056cc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
