import { Component } from 'preact';

import GamesCarousel from '../../components/gamescarousel';

import CountDown from '../../components/countdown';
import CoinBar from '../../components/coinbar';

import { auth, database } from '../../firebase';

import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';

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
	}

	componentDidMount() {

		auth.onAuthStateChanged(currentUser => {
			this.setState({
				currentUser: auth.currentUser
			});
		});
	}

	render() {

		return (
			<div class={`${style.home} page`}>
				<CountDown />
				<GamesCarousel showHeader showFavorite clickable />
				<CoinBar title="HUSTLE" progress={50} />
				<CoinBar title="SNOOZE" progress={40} />
				<CoinBar title="FLOW" progress={30} />
			</div>
		);
	}
}
