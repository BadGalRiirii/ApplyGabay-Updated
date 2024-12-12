// Import the functions you need from the Firebase SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Firestore
import { getAuth } from "firebase/auth"; // Firebase Authentication

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANHGSFF65qiryBTurPA3w2gJwhfmnrTBM",
  authDomain: "applygabay.firebaseapp.com",
  projectId: "applygabay",
  storageBucket: "applygabay.appspot.com",
  messagingSenderId: "453782182119",
  appId: "1:453782182119:web:e4e857e43d46046c182a42",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Export Firestore and Auth
export { db, auth };
