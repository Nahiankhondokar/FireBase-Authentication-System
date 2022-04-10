import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7nl8gdsEDHeNwuC1i2bD9yBvTCaM4o7Q",
  authDomain: "fir-mearn-auth.firebaseapp.com",
  projectId: "fir-mearn-auth",
  storageBucket: "fir-mearn-auth.appspot.com",
  messagingSenderId: "903269894312",
  appId: "1:903269894312:web:8941eab6ea9c27031a1a9d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);