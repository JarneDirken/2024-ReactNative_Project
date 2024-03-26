// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYU4ezDWuHfhIPR1jgjMqF_OB6VSOt-5Y",
  authDomain: "expensses-8f324.firebaseapp.com",
  projectId: "expensses-8f324",
  storageBucket: "expensses-8f324.appspot.com",
  messagingSenderId: "113144805130",
  appId: "1:113144805130:web:62523c20eed79ae6f22cf3"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export { firebase }