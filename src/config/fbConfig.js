import firebase from 'firebase/app';
import 'firebase/storage';

import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyApzPfZ_K3s9G8Q_RCI3079ZVuVLiM0Bew",
    authDomain: "stockapp-3482f.firebaseapp.com",
    databaseURL: "https://stockapp-3482f.firebaseio.com",
    projectId: "stockapp-3482f",
    storageBucket: "stockapp-3482f.appspot.com",
    messagingSenderId: "345379303284",
    appId: "1:345379303284:web:69ad8e4df2c3444d384621",
    measurementId: "G-RCRX6HRXPC"
  };
  // Initialize Firebase
  firebase.initializeApp(config);
  firebase.firestore().settings({ timestampsInSnapshots: true });
  const storage = firebase.storage()

  export {
    storage, firebase as default
}