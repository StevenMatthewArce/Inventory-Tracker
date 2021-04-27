import firebase from "firebase";

import 'firebase/auth';
import 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseApp = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_KEY,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

firebase.initializeApp(firebaseApp);

const db = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth();

const googleProvider = new firebase.auth.GoogleAuthProvider();
const googleSignIn = () => {
  auth.signInWithRedirect(googleProvider).then((res) => {
    console.log(res.user);
  })
  .catch((error) => {
    console.log(error.message);
  })
}

const signUpWithEmailAndPassword = ( userData ) => {
  const email = userData.email;
  const password = userData.password;

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const id = userCredential.user.uid;
      db.collection('users').doc(id).set({
        name: userData.name,
        email: userData.email,
        password: userData.password,
        shopName: userData.shopName
      })
      return 'User has been signed up';
    })
    .catch((error) => {
      return error.message;
    });
}

const loginWithEmailAndPassword = (email, password) => {
  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      return 'Signed in';
    })
    .catch((error) => {
      return error.message;
    })
}

const signOut = () => {
  auth.signOut()
    .then(() => {
      return 'Signed out';
    })
    .catch((error) => {
      return error.message;
    })
}

export { 
  db, 
  storage, 
  auth,
  googleSignIn,
  signUpWithEmailAndPassword,
  signOut,
  loginWithEmailAndPassword,
};
