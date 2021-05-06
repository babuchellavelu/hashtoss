import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';


const firebaseConfig ={
    apiKey: "AIzaSyC-Zth_sZjdh1I3vMREKhKtKChxOPLAht4",
    authDomain: "reventscource.firebaseapp.com",
    projectId: "reventscource",
    storageBucket: "reventscource.appspot.com",
    messagingSenderId: "491815148478",
    appId: "1:491815148478:web:ca96714375ba31bc21b7ef"
}

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;