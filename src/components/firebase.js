// Import the functions you need from the Firebase SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Firestore
import { getAuth } from "firebase/auth"; // Firebase Authentication

// Your web app's Firebase configuration
const firebaseConfig = {
<<<<<<< HEAD
  apiKey: "AIzaSyANHGSFF65qiryBTurPA3w2gJwhfmnrTBM",
  authDomain: "applygabay.firebaseapp.com",
  projectId: "applygabay",
  storageBucket: "applygabay.appspot.com",
  messagingSenderId: "453782182119",
  appId: "1:453782182119:web:e4e857e43d46046c182a42",
=======
  apiKey: "AIzaSyD18raDqkTMGUCyVTNWF8WNdtmMcnGt8-E",
  authDomain: "apply-gabay.firebaseapp.com",
  databaseURL: "https://apply-gabay-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "apply-gabay",
  storageBucket: "apply-gabay.firebasestorage.app",
  messagingSenderId: "448070800158",
  appId: "1:448070800158:web:d2152d8d6a8471d4dd2f0f"
>>>>>>> b1e638429e6a3043c1798e33ede0c7a13a108014
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Export Firestore and Auth
export { db, auth };
