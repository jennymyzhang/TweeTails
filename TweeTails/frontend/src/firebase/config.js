// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTEFP5tX-hXmqYqJr79FgFexAtvdjzveU",
  authDomain: "tweetails.firebaseapp.com",
  projectId: "tweetails",
  storageBucket: "tweetails.appspot.com",
  messagingSenderId: "385821930316",
  appId: "1:385821930316:web:9dccedc778c9963ab315e9",
  measurementId: "G-DHTN5G4S00"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage();