
// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCBMBDFN3ZxoX0JZhIcQdTQd7n5I8uuqLU",
    authDomain: "todo-app-32412.firebaseapp.com",
    projectId: "todo-app-32412",
    storageBucket: "todo-app-32412.firebasestorage.app",
    messagingSenderId: "735676909509",
    appId: "1:735676909509:web:f49922334b3c46e1cbedac",
    measurementId: "G-VHBCWL0KJK"
  };

  // Initialize Firebase 
  const app = initializeApp(firebaseConfig);

  //initialize firestore
  const db = getFirestore(app);

  //export db so you can use it elese where
  export  {db};
