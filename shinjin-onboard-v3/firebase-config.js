// Firebase設定
const firebaseConfig = {
  apiKey: "AIzaSyDjcUb1pne3sDgEQMkv__vN6tFBDtiHSzM",
  authDomain: "shinjin-onboard.firebaseapp.com",
  projectId: "shinjin-onboard",
  storageBucket: "shinjin-onboard.firebasestorage.app",
  messagingSenderId: "45785530682",
  appId: "1:45785530682:web:2bccc2e52b8ff61f599003",
  measurementId: "G-6CS2E6JXHL"
};

// Firebase初期化
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
