import { Component } from 'preact';
import { Router } from 'preact-router';

import Header from './header';

import AlmostHere from '../routes/almosthere';
import Home from '../routes/home';
import MoreInfo from '../routes/moreinfo';
import Profile from '../routes/profile';
import SignIn from '../routes/signin';
import SignOut from '../routes/signout';
import Account from '../routes/account';
import Dash from '../routes/dash';
import Dark from '../routes/dark';
import Boards from '../routes/boards';
import Step1 from '../routes/step1';
import Quest from '../routes/quest';
import Outcome from '../routes/outcome';
import Thanks from '../routes/thanks';
import Catalog from '../routes/catalog';
import NotFound from '../routes/404';
import Notifications from 'react-notify-toast';
import { auth, database } from '../firebase';
// import gamesList from '../gamesList';
// import { database } from '../firebase';

export default class App extends Component {
	handleRoute = e => {
		setTimeout(() => {
			this.setState({
				currentUrl: e.url
			});
		}, 100);
	};

	componentWillMount() {


	}

	constructor(props) {

		super(props);
		this.games = [];

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
				let myDB = database.ref('users/' + auth.currentUser.uid +'/latest_date');
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
			}
			else {
				// User is signed out.
				// ...
			}
		});

	}


	render() {
		return (
			<div id="app">
				<Notifications options={{ zIndex: 200, top: '180px' }} />
				{this.state.currentUrl !== '/dark' && <Header selectedRoute={this.state.currentUrl} />}
				<Router onChange={this.handleRoute}>
					<Step1 path="/" />
					<Home path="/home" />
					<Profile path="/profile/" user="me" />
					<Profile path="/profile/:user" />
					<Account path="/account" />
					<SignIn path="/signin" />
					<SignOut path="/signout" />
					<Dark path="/dark/" delay="3600" />
					<Dark path="/dark/:delay" />
					<Dash path="/dash" selectedGame="1" />
					<Dash path="/dash/:selectedGame" />
					<AlmostHere path="/almosthere" />
					<MoreInfo path="/moreinfo" />
					<Boards path="/boards" />
					<Step1 path="/step1" />
					<Quest path="/quest" />
					<Outcome path="/outcome" />
					<Thanks path="/thanks" />
					<Catalog path="/cat" />
					<NotFound default />
				</Router>
			</div>
		);
	}
}
