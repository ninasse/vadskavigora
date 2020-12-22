import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCfSpK2RqUPmOys8PprJl_311XQRyJx2lk",
    authDomain: "vad-ska-vi-gora-nu.firebaseapp.com",
    projectId: "vad-ska-vi-gora-nu",
    storageBucket: "vad-ska-vi-gora-nu.appspot.com",
    messagingSenderId: "196980201166",
    appId: "1:196980201166:web:6285b990cf99f89f09e29f",
    measurementId: "G-H1B8S2ER1H"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  //firebase.analytics();

  export default firebase;