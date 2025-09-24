// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkDRAyR0pkyetBL9LQV6OS38mHAlgymnc",
  authDomain: "ad-goals-tracker.firebaseapp.com",
  projectId: "ad-goals-tracker",
  storageBucket: "ad-goals-tracker.firebasestorage.app",
  messagingSenderId: "1062326837135",
  appId: "1:1062326837135:web:ee5be2ab7d98b105aff5fa",
  measurementId: "G-QF96RK7KPZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics only if supported (browser environment)
let analytics;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

// Export the app for use in other files
export default app;
