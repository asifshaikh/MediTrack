// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyD5eeyecdJDx8Vx2K0IqSL9jxl_kfev6TM',
  authDomain: 'meditrack-b11da.firebaseapp.com',
  projectId: 'meditrack-b11da',
  storageBucket: 'meditrack-b11da.firebasestorage.app',
  messagingSenderId: '666290022222',
  appId: '1:666290022222:web:4f2b764036726dfe85a01f',
  measurementId: 'G-315YK3ECJE',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);
