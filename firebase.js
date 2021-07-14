import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBQDwhzf-0Hd_xfwft6AXZUPTu0A9oGgfQ",
  authDomain: "fir-959bd.firebaseapp.com",
  projectId: "fir-959bd",
  storageBucket: "fir-959bd.appspot.com",
  messagingSenderId: "268534400480",
  appId: "1:268534400480:web:43be36f257f819c1f45785",
  measurementId: "G-RZ0ZMKRGTC",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export default db;
