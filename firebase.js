// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCt2ymbsSQimRAJFSrfVqX62ssNZYCZFDM",
  authDomain: "instagram-clone-next-886e0.firebaseapp.com",
  projectId: "instagram-clone-next-886e0",
  storageBucket: "instagram-clone-next-886e0.appspot.com",
  messagingSenderId: "637297991767",
  appId: "1:637297991767:web:92f84ab033967ebcda0312",
  measurementId: "G-C2EVWHF618"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export {app, db, storage };