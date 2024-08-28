import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD0geogRufhy4hwMekAd3S4k7uYmNmahJ4",
  authDomain: "work-room-203dd.firebaseapp.com",
  projectId: "work-room-203dd",
  storageBucket: "work-room-203dd.appspot.com",
  messagingSenderId: "96497325237",
  appId: "1:96497325237:web:79b997ef45af1b600a5afc",
  measurementId: "G-4Z16R72V4R"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db