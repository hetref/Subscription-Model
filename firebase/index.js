// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBE-OCjOgrpb7Zll8vXb_aNurVzXHBbYwk",
  authDomain: "saassubscription-988a5.firebaseapp.com",
  projectId: "saassubscription-988a5",
  storageBucket: "saassubscription-988a5.appspot.com",
  messagingSenderId: "869592934056",
  appId: "1:869592934056:web:c1941e3111208c08bc049d",
  measurementId: "G-SLQE2RKVHK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const initFirebase = () => {
  return app;
};
