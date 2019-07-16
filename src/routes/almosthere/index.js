import { Component } from 'preact';
import SignIn from '../../components/signin';
import { auth, database } from '../../firebase';
import Notifications from 'react-notify-toast';
import GamesCarousel from '../../components/gamescarousel';
import { route } from 'preact-router';

import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';

import Button from 'preact-material-components/Button';

import style from './style';
import './customcar.css';

export default class AlmostHere extends Component {

	constructor() {

		super();
		this.state = {
			currentUser: null
		};
		this.props = {
			currentUser: 'No User'
		};
	}

	static writeUserData(userId, name, email, imageUrl) {
		database.ref('users/' + userId).update({
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
			this.props.currentUser = auth.currentUser;

			if (auth && auth.currentUser) {
				AlmostHere.writeUserData(auth.currentUser.uid,
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
				{!currentUser && <SignIn/>}
				{/*{currentUser && <CurrentUser user={currentUser} />}*/}
				{currentUser && <div>
					<div class={style.smaller}>ITS ALMOST HERE!</div>
					<div class={style.beta}>DRAFTCARDS</div>
					<div class={style.betaRot}>BETA!</div>
					<div class={style.smaller}>1 week of fast, free, and fun gameplay and YOUR<br/>chance to be heard!
					</div>
					<GamesCarousel class={style.mini} showHeader={false} showFavorite={false}/>
					<div class={style.smaller}>Shape the Future of</div>
					<div class={style.beta}>DRAFTCARDS</div>
					<div class={style.cent}>
						<Button raised ripple dense class={style.green}
								onClick={() => route('/')}>
							BRING&nbsp;IT&nbsp;ON
						</Button>
					</div>
					<div class={style.cent}>
						<Button ripple secondary
								onClick={() => route('/moreinfo')}>
							MORE&nbsp;INFO
						</Button>
					</div>
				</div>}
				<Notifications options={{ zIndex: 200, top: '180px' }}/>
			</div>
		);
	}
}
