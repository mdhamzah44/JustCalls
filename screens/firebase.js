import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBN1tx2ahjGlvxJbyHQiyVTgzvw6uOIo",
    authDomain: "vritant.firebaseapp.com",
    databaseURL: "https://vritant-default-rtdb.firebaseio.com",
    projectId: "vritant",
    storageBucket: "vritant.appspot.com",
    messagingSenderId: "129944972429",
    appId: "1:1294972429:web:1cec03845f8e6a8f5e46c4",
    measurementId: "G-HHGNK105S5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;
