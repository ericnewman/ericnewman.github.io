import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import ReactGA from 'react-ga';

// const firebaseConfig = {
// 	apiKey: 'AIzaSyDQSvwriCLeiaSz347EuOkAwqtDcThZxRI',
// 	authDomain: 'project-1875425763099789466.firebaseapp.com',
// 	databaseURL: 'https://project-1875425763099789466.firebaseio.com',
// 	projectId: 'project-1875425763099789466',
// 	storageBucket: 'project-1875425763099789466.appspot.com',
// 	messagingSenderId: '948162458323',
// 	appId: '1:948162458323:web:bc126f0bb10b7807'
// };

const firebaseConfig = {
	apiKey: 'AIzaSyA_pI9dIT3dmhjwGz3IuZ2qs1F0oS570XY',
	authDomain: 'draftcards.firebaseapp.com',
	databaseURL: 'https://draftcards.firebaseio.com',
	projectId: 'draftcards',
	storageBucket: 'draftcards.appspot.com',
	messagingSenderId: '1086520171792',
	appId: '1:1086520171792:web:202e4e80dad01f32'
};

let db, aAuth, gAP, aUser;

if (typeof window !== 'undefined') {
	firebase.initializeApp(firebaseConfig);
	db =  firebase.database();
	aAuth = firebase.auth();
	gAP = new firebase.auth.GoogleAuthProvider();

	aAuth.signInAnonymously().catch((error) => {
		// Handle Errors here.
		// let errorCode = error.code;
		// let errorMessage = error.message;
		// ...
		ReactGA.event({
			category: 'Firebase Error',
			action: 'signInAnonymously',
			label: error.message,
			nonInteraction: true
		});
	});

	aAuth.onAuthStateChanged((user) => {
		if (user) {
			// User is signed in.
			// let isAnonymous = user.isAnonymous;
			// let uid = user.uid;
			// ...
			aUser = user;
			ReactGA.event({
				category: 'Firebase Auth State Change',
				action: 'User Signed In',
				label: user.uid,
				nonInteraction: true
			});

			let myDB = database.ref('users/' + auth.currentUser.uid + '/latest_visit');
			let fDB = database.ref('users/' + auth.currentUser.uid + '/first_visit');
			let newD = new Date().toLocaleString('en-US').split(',')[0];
			let udref = database.ref('users/' + auth.currentUser.uid + '/unique_day_count');
			let firstDay = '';
			fDB.on('value', (snapshot) => {
				fDB.transaction((day) =>  {
					firstDay = day;
					return day || (newD);
				});
			});

			myDB.once('value', (snapshot) => {
				myDB.transaction((latestVisit) => (newD));

				udref.transaction((uniqueDays) => daysDifference( firstDay, newD));
			});


			if (!this.visitCounted) {
				let ref = database.ref('users/' + auth.currentUser.uid + '/totalVisits');
				ref.transaction((totalPlays) =>
					(totalPlays || 0) + 1
				);
				this.visitCounted = true;
			}

		}
		else {
			// User is signed out.
			// ...
			ReactGA.event({
				category: 'Firebase Auth State Change',
				action: 'User Signed Out',
				label: user.uid,
				nonInteraction: true
			});

		}
	});

}
function daysDifference(d0, d1) {
	let diff = new Date(d1).setHours(12) - new Date(d0).setHours(12);
	return Math.round(diff/8.64e7);
}
export const database = db;
export const auth = aAuth;
export const user = aUser;
export const googleAuthProvider =  gAP;
