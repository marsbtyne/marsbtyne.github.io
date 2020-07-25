import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCOvDGXIuekFUUzSPh5l1940wCB657NudI",
    authDomain: "nycfridge-1595334632389.firebaseapp.com",
    databaseURL: "https://nycfridge-1595334632389.firebaseio.com",
    projectId: "nycfridge-1595334632389",
    storageBucket: "nycfridge-1595334632389.appspot.com",
    messagingSenderId: "1012323391989",
    appId: "1:1012323391989:web:0326829c1bd942705fe8bc",
    measurementId: "G-8G077TP9PC"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
 
  
  export default firebase;