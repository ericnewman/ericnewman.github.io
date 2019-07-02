import { h, Component } from 'preact';
import SignIn from '../../components/signin';
import CurrentUser from '../../components/currentuser';
import { auth } from '../../firebase';
import { database } from '../../firebase';

import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import Notifications from 'react-notify-toast';
import style from './style';


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
				<div>
					<div class={style.smaller}>ITS ALMOST HERE</div>
					<div class={style.beta}>DRAFTCARDS</div>
					<div class={style.betaRot}>BETA</div>
				</div>
				<Notifications options={{ zIndex: 200, top: '180px' }} />
			</div>
		);
	}
}
