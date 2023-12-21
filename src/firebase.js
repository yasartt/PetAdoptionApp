// firebase.js

import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCQEYNWEyZkaVSCHzQoInrtLkb0JScOZ80",
  authDomain: "cs353-e0ce0.firebaseapp.com",
  projectId: "cs353-e0ce0",
  storageBucket: "cs353-e0ce0.appspot.com",
  messagingSenderId: "1018310909105",
  appId: "1:1018310909105:web:e15f878adb3aabf5559690"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };



