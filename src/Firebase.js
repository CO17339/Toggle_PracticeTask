import app from 'firebase/app';

var firebaseConfig = {
    apiKey: "AIzaSyBB3ZCShtcqKFALaJSU6GrX8RwhvIAqFp0",
    authDomain: "togglttrack.firebaseapp.com",
    databaseURL: "https://togglttrack-default-rtdb.firebaseio.com",
    projectId: "togglttrack",
    storageBucket: "togglttrack.appspot.com",
    messagingSenderId: "682785895284",
    appId: "1:682785895284:web:f139d4fca6de9b0ed4b221",
    measurementId: "G-6R842V3DP6"
  };

  class Firebase {
    constructor() {
      app.initializeApp(firebaseConfig);
    }
  }
   
  export default Firebase;


  // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
