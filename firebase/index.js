import firebase from "firebase/app";
import "firebase/storage"
import "firebase/database"

const firebaseConfig = {
    apiKey: "AIzaSyC_TasoKlB2K-o7c-58Rhtg7iTTM5xakKs",
    authDomain: "tipreactnative-a0b8d.firebaseapp.com",
    databaseURL: "https://tipreactnative-a0b8d-default-rtdb.firebaseio.com",
    projectId: "tipreactnative-a0b8d",
    storageBucket: "tipreactnative-a0b8d.appspot.com",
    messagingSenderId: "422911598629",
    appId: "1:422911598629:web:9e1392686c80ab3b891fcc"

  };
  firebase.initializeApp(firebaseConfig);

  const data = firebase.database();
  const storage = firebase.storage();
  
  export {data, storage, firebase as default};
