import { h, Component } from 'preact';
import SignIn from '../../components/signin';
import Snooze from '../../components/snooze';

import GamesCarousel from '../../components/gamescarousel';

import Achievements from '../../components/achievements';
import Leaderboard from '../../components/leaderboard';
import CurrentUser from '../../components/currentuser';
import LogRocket from 'logrocket';
import { auth } from '../../firebase';
import firebase from 'firebase/app';

import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import Notifications from 'react-notify-toast';
import style from './style';


export default class Home extends Component {

	constructor() {
		super();

		this.state = {
			currentUser: null
		};
	}

	static writeUserData(userId, name, email, imageUrl) {
		firebase.database().ref('users/' + userId.replace(/[,@).]/gi, '_')).set({
			username: name,
			email,
			profile_picture: imageUrl
		});
	}

	componentDidMount() {

		auth.onAuthStateChanged(currentUser => {
			this.setState({
				currentUser: auth.currentUser
			});
			if (auth && auth.currentUser) {
				Home.writeUserData(auth.currentUser.email,
					auth.currentUser.displayName,
					auth.currentUser.email,
					auth.currentUser.photoURL);
			}
		});

		if (auth && auth.currentUser && auth.currentUser.displayName) {
			LogRocket.identify(auth.currentUser.displayName, {
				name: auth.currentUser.displayName,
				email: auth.currentUser.email,

				// Add your own custom user variables here, ie:
				subscriptionType: 'demo'
			});
		}

		// 			const exercisesRef = database.ref(
		// 				'/' + this.state.currentUser.uid + '/exercises'
		// 			);
		//
		// 			exercisesRef.on('value', snapshot => {
		// 				this.setState({ exercises: snapshot.val() });
		// 			});

	}


	render() {
		let currentUser;

		if (auth && auth.currentUser && auth.currentUser.displayName) {
			currentUser = auth.currentUser;
		}

		return (
			<div class={`${style.home} page`}>
				 {!currentUser && <SignIn />}
				 {currentUser && <CurrentUser user={currentUser} />}
				<GamesCarousel  />
				 {<Snooze />}
				 {currentUser && <Achievements />}
				 {currentUser && <Leaderboard />}
				<Notifications options={{ zIndex: 200, top: '180px' }} />
			</div>
		);
	}
}
