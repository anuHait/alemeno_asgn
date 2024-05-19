import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyAa4dxp9o4LDc7Z5lLSfA_lWqeDazTXrQ0",
  authDomain: "alemeno-ce69e.firebaseapp.com",
  projectId: "alemeno-ce69e",
  storageBucket: "alemeno-ce69e.appspot.com",
  messagingSenderId: "321945208202",
  appId: "1:321945208202:web:f22b256af00d8b6f72f473"
};

// Initialize Firebase
 initializeApp(firebaseConfig);



const db = getFirestore();

export default db;

