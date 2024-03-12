// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDiEM0Xn9wSzUy-rYxvIMt9qcTAQ5rFsMU",
  authDomain: "sellprogpt.firebaseapp.com",
  projectId: "sellprogpt",
  storageBucket: "sellprogpt.appspot.com",
  messagingSenderId: "634827439120",
  appId: "1:634827439120:web:bce6dbe3cfce18443f5e95",
  measurementId: "G-968DT23YN2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;
export const auth = getAuth();
