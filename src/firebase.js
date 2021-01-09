import firebase from 'firebase/app';
import "firebase/database";
import 'firebase/firestore';
import 'firebase/analytics';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyABqzSUg3zFO_bwHb9_9ufYx0t9IhqOF5U",
  authDomain: "vadskavi-goranu.firebaseapp.com",
  projectId: "vadskavi-goranu",
  storageBucket: "vadskavi-goranu.appspot.com",
  messagingSenderId: "206426006343",
  appId: "1:206426006343:web:995e803394c595df88a262",
  measurementId: "G-JCCT9EC9FZ"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  //firebase.analytics();

  export default firebase;