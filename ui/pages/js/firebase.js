var firebaseConfig = {
    apiKey: "AIzaSyD8hImNox3auUHB5MqWaffbP3QOTZmxzPc",
    authDomain: "mybrand-76a4f.firebaseapp.com",
    databaseURL: "https://mybrand-76a4f.firebaseio.com",
    projectId: "mybrand-76a4f",
    storageBucket: "mybrand-76a4f.appspot.com",
    messagingSenderId: "231455653710",
    appId: "1:231455653710:web:a1edbd40fadee1452e281f",
    measurementId: "G-1SHLBX8XKF"
  };

//   const firebaseConfig = {
//   apiKey: "AIzaSyDqQaJgWafY_tQV-rM5S-Y9JeJ4k3QIAu4",
//   authDomain: "mybrand-1.firebaseapp.com",
//   databaseURL: "https://mybrand-1.firebaseio.com",
//   projectId: "mybrand-1",
//   storageBucket: "mybrand-1.appspot.com",
//   messagingSenderId: "766648410269",
//   appId: "1:766648410269:web:c3ef4553500c759359f474",
//   measurementId: "G-HNLBE8P1K6"
// };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db=firebase.firestore();
  const auth=firebase.auth();
//   
// 

// #########################################