// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyBxIjIHO_xky0kX7MkmlEDMV_AkjThgog8",
  authDomain: "indoorxyz.firebaseapp.com",
  projectId: "indoorxyz",
  storageBucket: "indoorxyz.firebasestorage.app",
  messagingSenderId: "1036065165143",
  appId: "1:1036065165143:web:1ed1f9cb9a24486b27f812"
};

// Initialize Firebase
let app;
let auth;
let db;
let storage;

try {
  // Initialize Firebase app
  app = initializeApp(firebaseConfig);
  
  // Initialize Firebase services
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);

  // Connect to emulators if in development environment
  if (__DEV__) {
    // Uncomment these lines if you want to use Firebase Emulators
    // connectAuthEmulator(auth, 'http://localhost:9099');
    // connectFirestoreEmulator(db, 'localhost', 8080);
    // connectStorageEmulator(storage, 'localhost', 9199);
  }

  console.log('Firebase initialized successfully');
} catch (error) {
  console.error('Error initializing Firebase:', error);
}

// Export Firebase instances
export { app, auth, db, storage };

// Export a function to check if Firebase is initialized
export const isFirebaseInitialized = () => {
  return app !== undefined && auth !== undefined && db !== undefined;
};