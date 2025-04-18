// src/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyDbw5GrVhePkrszUvT9enp3oeZXmuoIAIk",
  authDomain: "bellerose-81739.firebaseapp.com",
  projectId: "bellerose-81739",
  storageBucket: "bellerose-81739.firebasestorage.app",
  messagingSenderId: "477744103924",
  appId: "1:477744103924:web:5ec612ab6ae4558a5339a"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);  // para ventas
export const auth = getAuth(app);     // para login
