import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDwTtc3CTSogrGGQwbAWeuZPXzELhZCzwg",
    authDomain: "softuni-react-final.firebaseapp.com",
    databaseURL: "https://softuni-react-final.firebaseio.com",
    projectId: "softuni-react-final",
    storageBucket: "softuni-react-final.appspot.com",
    messagingSenderId: "251392329758",
    appId: "1:251392329758:web:15d68e3962a7a42147460f",
    measurementId: "G-WHSKP44RV6"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();