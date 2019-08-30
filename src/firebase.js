import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
// import 'firebase/performance';
import ReactGA from 'react-ga';

const firebaseConfig = {
	apiKey: 'AIzaSyDQSvwriCLeiaSz347EuOkAwqtDcThZxRI',
	authDomain: 'project-1875425763099789466.firebaseapp.com',
	databaseURL: 'https://project-1875425763099789466.firebaseio.com',
	projectId: 'project-1875425763099789466',
	storageBucket: 'project-1875425763099789466.appspot.com',
	messagingSenderId: '948162458323',
	appId: '1:948162458323:web:bc126f0bb10b7807'
};
let db, aAuth, gAP, aUser;

if (typeof window !== 'undefined') {
	firebase.initializeApp(firebaseConfig);
	db =  firebase.database();
	aAuth = firebase.auth();
	gAP = new firebase.auth.GoogleAuthProvider();
	// const perf = firebase.performance();

	aAuth.signInAnonymously().catch((error) => {
		// Handle Errors here.
		// let errorCode = error.code;
		// let errorMessage = error.message;
		// ...
		ReactGA.event({
			category: 'Firebase Error',
			action: 'signInAnonymously',
			label: error,
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
			let myDB = database.ref('users/' + auth.currentUser.uid + '/latest_visit');
			let newD = new Date().toLocaleString('en-US').split(',')[0];

			myDB.once('value', (snapshot) => {

				if (newD !== snapshot.val()) {

					let ref = database.ref('users/' + auth.currentUser.uid + '/unique_day_count');
					ref.transaction((uniqueDays) => (uniqueDays || 0) + 1);
				}
			});

			// myDB.set({latest_visit:d });
			let ref = database.ref('users/' + auth.currentUser.uid + '/latest_visit');
			ref.transaction((latestVisit) => (newD));

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
				category: 'Firebase Auth State CHange',
				action: 'User Signed Out',
				label: user,
				nonInteraction: true
			});

		}
	});

}
export const database = db;
export const auth = aAuth;
export const user = aUser;
export const googleAuthProvider =  gAP;
