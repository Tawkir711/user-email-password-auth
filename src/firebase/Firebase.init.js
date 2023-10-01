// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZ9_gWLjduNq4S3QbBcCZqnlg5CcIetAI",
  authDomain: "user-email-password-auth-43047.firebaseapp.com",
  projectId: "user-email-password-auth-43047",
  storageBucket: "user-email-password-auth-43047.appspot.com",
  messagingSenderId: "173444535830",
  appId: "1:173444535830:web:3c1ec177d77412c7268737"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;