import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCLnDQ14DIvsv-4GDMp8emzycHkFXrjpEM",
    authDomain: "attendee-app-7bf3b.firebaseapp.com",
    projectId: "attendee-app-7bf3b",
    storageBucket: "attendee-app-7bf3b.firebasestorage.app",
    messagingSenderId: "156343382155",
    appId: "1:156343382155:web:a6885838db8fe831a2a48e",
    measurementId: "G-VZVF1YERLM"
  };
  
initializeApp(firebaseConfig);
export const db = getFirestore();