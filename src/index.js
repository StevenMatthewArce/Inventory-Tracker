import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Firebase from './components/Firebase/firebase';
import { FirebaseContext } from './components/Firebase';

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById('root')
);