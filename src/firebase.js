import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyARMeTt6d3IrLyFV2_7UYqp5k1WRvFKrBs",
  authDomain: "reactmuicrudapp-94e21.firebaseapp.com",
  projectId: "reactmuicrudapp-94e21",
  storageBucket: "reactmuicrudapp-94e21.appspot.com",
  messagingSenderId: "995598278156",
  appId: "1:995598278156:web:6dbf1ff1be008393285829",
  measurementId: "G-ZMQ4712L67",
};
// Initialize Firebase
const FirebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default FirebaseApp;
export { db };
