import * as firebase from 'firebase/app';
import "firebase/auth";
import "firebase/functions";
import "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyDQSvwriCLeiaSz347EuOkAwqtDcThZxRI",
  authDomain: "project-1875425763099789466.firebaseapp.com",
  databaseURL: "https://project-1875425763099789466.firebaseio.com",
  projectId: "project-1875425763099789466",
  storageBucket: "project-1875425763099789466.appspot.com",
  messagingSenderId: "948162458323",
  appId: "1:948162458323:web:bc126f0bb10b7807"
};


firebase.initializeApp(firebaseConfig);

export const database = firebase.database();
export const auth = firebase.auth();
export const googleAuthProvider =  new firebase.auth.GoogleAuthProvider();;
