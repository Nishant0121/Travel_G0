// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBLnGaX2V2bPnpfhkQu5w09yy6UXboTME",
  authDomain: "travel-go-eb44f.firebaseapp.com",
  projectId: "travel-go-eb44f",
  storageBucket: "travel-go-eb44f.appspot.com",
  messagingSenderId: "332643858272",
  appId: "1:332643858272:web:57b1fa7cd6502345399005",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export default app;
