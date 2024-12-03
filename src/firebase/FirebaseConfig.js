// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBTkDf8L7XeelRQiw_kGJ_U0l5aT1S6l6A",
  authDomain: "familywebapp.firebaseapp.com",
  databaseURL: "https://familywebapp-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "familywebapp",
  storageBucket: "familywebapp.firebasestorage.app",
  messagingSenderId: "123326654481",
  appId: "1:123326654481:web:9657cd314d53138ada69b0",
  measurementId: "G-JB69ZMJMS3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);