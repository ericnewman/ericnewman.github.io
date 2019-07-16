import { Component } from 'preact';
import SignIn from '../../components/signin';
import Snooze from '../../components/snooze';

import GamesCarousel from '../../components/gamescarousel';

import Achievements from '../../components/achievements';
import Leaderboard from '../../components/leaderboard';
import TopPlayers from '../../components/topplayers';
import CurrentUser from '../../components/currentuser';
import CountDown from '../../components/countdown';
import CoinBar from '../../components/coinbar';

import { auth, database } from '../../firebase';

import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import Notifications from 'react-notify-toast';

import style from './style';


export default class Home extends Component {

	static writeUserData(userId, name, email, imageUrl) {
		database.ref('users/' + userId).update({
			username: name,
			email,
			profile_picture: imageUrl
		});
	}

	constructor() {

		super();

		this.state = {
			currentUser: null
		};
		this.props = {
			currentUser: 'No User'
		};
	}


	componentDidMount() {

		auth.onAuthStateChanged(currentUser => {
			this.setState({
				currentUser: auth.currentUser
			});
			this.props.currentUser = auth.currentUser;

			if (auth && auth.currentUser) {
				Home.writeUserData(auth.currentUser.uid,
					auth.currentUser.displayName,
					auth.currentUser.email,
					auth.currentUser.photoURL);
			}
		});
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
				<CountDown />

				<GamesCarousel showHeader showFavorite />
				<CoinBar title="HUSTLE" progress={50} />
				<CoinBar title="SNOOZE" progress={40} />
				<CoinBar title="FLOW" progress={30} />
				{currentUser && <Leaderboard />}
				{currentUser && <Achievements />}
				{currentUser && <TopPlayers />}
				{<Snooze />}
				<Notifications options={{ zIndex: 200, top: '180px' }} />
			</div>
		);
	}
}
