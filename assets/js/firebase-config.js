import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDLdWH3D1EsYRqhUWoifUH8a-0mLD9gdyo",
  authDomain: "abid-hair-salon.firebaseapp.com",
  databaseURL: "https://abid-hair-salon-default-rtdb.firebaseio.com",
  projectId: "abid-hair-salon",
  storageBucket: "abid-hair-salon.firebasestorage.app",
  messagingSenderId: "451665678382",
  appId: "1:451665678382:web:2560497d98e1418286cfbf"
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
