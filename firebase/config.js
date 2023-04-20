import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAyT2EC0FWJi8AIaiZUuuP2Bm0IkNnEkOg",
  authDomain: "fp-kelompok3.firebaseapp.com",
  projectId: "fp-kelompok3",
  storageBucket: "fp-kelompok3.appspot.com",
  messagingSenderId: "149193814070",
  appId: "1:149193814070:web:1ce58e060c04590aa3e897",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
