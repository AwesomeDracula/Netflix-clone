import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAUZqtEVguH9bKPMcTMxa0D4dv71HwZuqw",
  authDomain: "netflix-clone-f9876.firebaseapp.com",
  projectId: "netflix-clone-f9876",
  storageBucket: "netflix-clone-f9876.appspot.com",
  messagingSenderId: "118532028575",
  appId: "1:118532028575:web:86dbf82026b13a10520aaa",
  measurementId: "G-XCFEV4P606"
};

const fireabseApp = firebase.initializeApp(firebaseConfig);
const db = fireabseApp.firestore();
const auth = firebase.auth();
const database = firebase.database();

export {auth, database};
export default db;