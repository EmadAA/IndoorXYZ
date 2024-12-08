
// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // Import Firestore
// Import necessary Firebase SDKs



const firebaseConfig = {
  apiKey: "AIzaSyBxIjIHO_xky0kX7MkmlEDMV_AkjThgog8",
  authDomain: "indoorxyz.firebaseapp.com",
  projectId: "indoorxyz",
  storageBucket: "indoorxyz.firebasestorage.app",
  messagingSenderId: "1036065165143",
  appId: "1:1036065165143:web:1ed1f9cb9a24486b27f812",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Export the auth instance
const auth = getAuth(app);
const db = getFirestore(app); // Firestore initialization
export { auth, db };

