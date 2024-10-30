// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDQi6CCt61V_s4QORyyTHWBI_9n_9w--ss",
  authDomain: "projeto-react-native-6f167.firebaseapp.com",
  projectId: "projeto-react-native-6f167",
  storageBucket: "projeto-react-native-6f167.appspot.com",
  messagingSenderId: "753861379844",
  appId: "1:753861379844:web:327155b534234520acf251",
  measurementId: "G-BS4435MEMF"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);

// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);