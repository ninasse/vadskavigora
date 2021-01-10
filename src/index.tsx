import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
<<<<<<< HEAD
import firebase from 'firebase'
=======
import * as firebase from 'firebase/app'

import "firebase/database";
import 'firebase/firestore';
import 'firebase/analytics';
import 'firebase/auth';


>>>>>>> 2c772b4d62278e4be2135cd5a1cecbc6a7c75549
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
