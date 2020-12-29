import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

// const firebaseConfig = {
//   apiKey: "AIzaSyA2kAZe0BxLQiXnMfw_dbwxtOOb5jyzTQE",
//   authDomain: "sudoku-proj.firebaseapp.com",
//   databaseURL: "https://sudoku-proj.firebaseio.com",
//   projectId: "sudoku-proj",
//   storageBucket: "sudoku-proj.appspot.com",
//   messagingSenderId: "792757544750",
//   appId: "1:792757544750:web:225168cb4ab37fa0967cbf",
// };

var firebaseConfig = {
  apiKey: "AIzaSyAuKrpbDnhXWOcNRFK-_CljAY69ogD7ntc",
  authDomain: "labmanagement-bb91a.firebaseapp.com",
  databaseURL: "https://labmanagement-bb91a-default-rtdb.firebaseio.com",
  projectId: "labmanagement-bb91a",
  storageBucket: "labmanagement-bb91a.appspot.com",
  messagingSenderId: "763368490231",
  appId: "1:763368490231:web:be87b03c9ed80958333ff2",
  measurementId: "G-3Q213899MC"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();
const storage = firebase.storage()


export {
  storage, firebase as default
}