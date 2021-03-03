import firebase from 'firebase/app';
import 'firebase/firestore';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_KEY,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

firebase.initializeApp(config);

export const handleAddItem = (e, name, cost, quantity, dateRestocked) => {
  e.preventDefault();
  const ref = firestore.doc('items');

  ref.add({
    name: name,
    cost: cost,
    quantity: quantity,
    dateRestocked: dateRestocked
  })
};

export default firebase;

export const firestore = firebase.firestore();