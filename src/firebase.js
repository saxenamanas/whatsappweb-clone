import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCWKP-elv25dvrRlO8mdHCAU9YIhFPPGcg",
    authDomain: "whatsapp-clone-252ad.firebaseapp.com",
    databaseURL: "https://whatsapp-clone-252ad.firebaseio.com",
    projectId: "whatsapp-clone-252ad",
    storageBucket: "whatsapp-clone-252ad.appspot.com",
    messagingSenderId: "466051026780",
    appId: "1:466051026780:web:0730746b511d46d1babb99",
    measurementId: "G-78361VRSR6"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth,provider};
export default db;