import { Component } from 'preact';
import { Router } from 'preact-router';

import Header from './header';

import Dash from '../routes/dash';
import Dark from '../routes/dark';
import Step1 from '../routes/step1';
import Quest from '../routes/quest';
import Outcome from '../routes/outcome';
import Thanks from '../routes/thanks';``
import NotFound from '../routes/404';
import Notifications from 'react-notify-toast';
import { auth, database } from '../firebase';
import ReactGA from 'react-ga';

export default class App extends Component {
	handleRoute = e => {
		setTimeout(() => {
			ReactGA.pageview(e.url);

			this.setState({
				currentUrl: e.url
			});
		}, 100);
	};

	constructor(props) {

		super(props);

		this.games = [];
		this.visitCounted = false;
		this.state = {
			currentUrl: '.'
		}
		ReactGA.initialize('UA-102222556-2');
		ReactGA.pageview('/');


		if (typeof window !== 'undefined') {
			auth.signInAnonymously().catch((error) => {
				// Handle Errors here.
				// let errorCode = error.code;
				// let errorMessage = error.message;
				// ...
			});

			auth.onAuthStateChanged((user) => {
				if (user) {
					// User is signed in.
					// let isAnonymous = user.isAnonymous;
					// let uid = user.uid;
					let myDB = database.ref('users/' + auth.currentUser.uid + '/latest_visit');
					let new_d = new Date().toLocaleString('en-US').split(',')[0];
					let sameDay = true;

					myDB.once('value', (snapshot) => {
						if (new_d !== snapshot.val()) {
							let ref = database.ref('users/' + auth.currentUser.uid + '/unique_day_count');
							ref.transaction((uniqueDays) => (uniqueDays || 0) + 1);
						}
					});

					// myDB.set({latest_visit:d });
					let ref = database.ref('users/' + auth.currentUser.uid + '/latest_visit');
					ref.transaction((latest_visit) => (new_d));

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
				}
			});
		}

	}


	render(state) {
		let showHeader = true;
		let url = this.state.currentUrl;

		if(url) {
			showHeader = (url.indexOf('dark') === -1);
		}

		return (
			<div id="app">
				<Notifications options={{ zIndex: 200, top: '180px', wrapperId : 'toastBox' }} />
				{showHeader &&
					<Header selectedRoute={state.currentUrl} />}

				<Router onChange={this.handleRoute}>
					<Step1 path="/" />
					<Dark path="/dark/" delay="3600" />
					<Dark path="/dark/:delay" />
					<Dash path="/dash" selectedGame="1" />
					<Dash path="/dash/:selectedGame" />
					<Step1 path="/step1" />
					<Quest path="/quest" />
					<Outcome path="/outcome" />
					<Thanks path="/thanks" />
					<NotFound default />
				</Router>
			</div>
		);
	}
}
