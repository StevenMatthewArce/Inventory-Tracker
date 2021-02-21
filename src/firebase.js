import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "inventory-tracker-c1b74.firebaseapp.com",
  projectId: "inventory-tracker-c1b74",
  storageBucket: "inventory-tracker-c1b74.appspot.com",
  messagingSenderId: "124992388481",
  appId: "1:124992388481:web:f6232b95287897dc4bbc80",
  measurementId: "G-C8279Y2WYE"
};
firebase.initializeApp(config);

export default firebase;