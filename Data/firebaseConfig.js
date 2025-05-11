// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBVZ79ZeZLhzUBP1vOb7ZLwaFcqnnljeTc', 
  authDomain: 'lab2-38458.firebaseapp.com',
  projectId: 'lab2-38458',
  storageBucket: 'lab2-38458.appspot.com',
  messagingSenderId: '134907397406',
  appId: '1:134907397406:web:be39a6a2c15737de28f50f',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
