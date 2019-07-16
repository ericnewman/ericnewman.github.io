import * as firebase from 'firebase/app';
import 'firebase/auth';
// import "firebase/functions";
import 'firebase/database';

const firebaseConfig = {
	apiKey: 'AIzaSyDQSvwriCLeiaSz347EuOkAwqtDcThZxRI',
	authDomain: 'project-1875425763099789466.firebaseapp.com',
	databaseURL: 'https://project-1875425763099789466.firebaseio.com',
	projectId: 'project-1875425763099789466',
	storageBucket: 'project-1875425763099789466.appspot.com',
	messagingSenderId: '948162458323',
	appId: '1:948162458323:web:bc126f0bb10b7807'
};
let db, aAuth, gAP;

if (typeof window !== 'undefined') {
	firebase.initializeApp(firebaseConfig);
	db =  firebase.database();
	aAuth = firebase.auth();
	gAP = new firebase.auth.GoogleAuthProvider();
}
export const database = db;
export const auth = aAuth;
export const googleAuthProvider =  gAP;
