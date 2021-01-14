// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHLh8qCNOq05zyngiQrgmPTzVlFbGPdeE",
  authDomain: "unune-dc434.firebaseapp.com",
  projectId: "unune-dc434",
  storageBucket: "unune-dc434.appspot.com",
  messagingSenderId: "455367124485",
  appId: "1:455367124485:web:2d1a3e9dd3964409dede6c",
  measurementId: "G-NZH7PC074K",
};

export default firebase.initializeApp(firebaseConfig);
