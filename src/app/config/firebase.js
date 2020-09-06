import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyA2kAZe0BxLQiXnMfw_dbwxtOOb5jyzTQE",
  authDomain: "sudoku-proj.firebaseapp.com",
  databaseURL: "https://sudoku-proj.firebaseio.com",
  projectId: "sudoku-proj",
  storageBucket: "sudoku-proj.appspot.com",
  messagingSenderId: "792757544750",
  appId: "1:792757544750:web:225168cb4ab37fa0967cbf",
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;