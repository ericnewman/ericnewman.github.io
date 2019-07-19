import { h, Component } from 'preact';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import { notify } from 'react-notify-toast';

import style from './style';
import { auth, database } from '../../firebase';

import gamesList from '../../gamesList';

export default class PFrame extends Component {


	// onClick(e) {
	// 	this.state.click = !this.state.click;
	// 	this.setState(this.state);
	// 	this.showToast('Click');
	// 	//this.props.gameClick();
	//
	// }

	onBlur(e) {

		this.showToast('Game Start Detected');
		this.playGame();
	}

	onHover(e) {
		// this.showToast('Hover');
		// this.state.hovering = true;
		// this.setState(this.state);
	}

	onHoverExit(e) {
		// this.showToast('HoverExit');
		// this.state.hovering = false;
		// this.setState(this.state);
	}

	onCancel(e) {
		// this.showToast('onCancel');
	}

	showToast(msg) {
		let color = { background: '#F83', text: '#FFFFFF' };
		let timeout = 2000;

		notify.show(msg,
			'custom',
			timeout,
			color);
	}

	playGame() {

		let name = gamesList[this.props.game_id].name;
		let p = 'users/' + auth.currentUser.uid + '/games_played/' + name + '/times_played';

		let playsRef = database.ref(p);

		playsRef.transaction((numberOfTimesPlayed) =>
			// If numberOfTimesPlayed has never been set, numberOfTimesPlayed will be `null`.
			(numberOfTimesPlayed || 0) + 1
		);

		playsRef = database.ref('games/' + name + '/times_played');

		playsRef.transaction((numberOfTimesPlayed) =>
			// If numberOfTimesPlayed has never been set, numberOfTimesPlayed will be `null`.
			(numberOfTimesPlayed || 0) + 1
		);

		playsRef = database.ref('users/' + auth.currentUser.uid + '/totalPlays');
		playsRef.transaction((totalPlays) =>
			// If numberOfTimesPlayed has never been set, numberOfTimesPlayed will be `null`.
			(totalPlays || 0) + 1
		);


		if (this.props.doGameStarted) {
			this.props.doGameStarted();
		}
	}

	componentDidUnmount() {
		// removeEventListener('click', this.onClick);
		removeEventListener('blur', this.onBlur);
		removeEventListener('mouseover', this.onHover);
		removeEventListener('mouseout', this.onHoverExit);
		removeEventListener('touchend', this.onCancel);
		// removeEventListener('touchstart', this.onClick);
		removeEventListener('touchcancel', this.onCancel);
	}

	constructor(props) {

		super(props);

		this.state = {
			blurred: false,
			currentPlays:0,
			gameName: ""
		}

		this.onBlur = this.onBlur.bind(this);
		this.onHover = this.onHover.bind(this);
		this.onHoverExit = this.onHoverExit.bind(this);
		// this.onClick = this.onClick.bind(this);
		this.onCancel = this.onCancel.bind(this);
		this.playGame = this.playGame.bind(this);

	}

	componentDidMount() {
		// addEventListener('click', this.onClick);
		addEventListener('blur', this.onBlur);
		addEventListener('mouseover', this.onHover);
		addEventListener('mouseout', this.onHoverExit);
		addEventListener('touchend', this.onCancel);
		addEventListener('touchstart', this.onClick);
		addEventListener('touchcancel', this.onCancel);

		auth.signInAnonymously().catch(function (error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
		});

		auth.onAuthStateChanged(user => {
			if (user) {
				// User is signed in.
				let name = gamesList[this.props.game_id].name;
				let p = 'users/' + auth.currentUser.uid + '/games_played/' + name + '/times_played';

				let playsRef = database.ref(p);

				playsRef.on('value', snapshot => {
					this.setState({currentPlays: snapshot.val(), gameName: name});
				});
			}
			else {
				// User is signed out.
				// ...
			}
		});
	}


	render(props,state) {

		return (
			<div>
				<iframe {...props} class={style.framey}/>
				<div class={style.plays}> You have played: {state.gameName} {state.currentPlays} Times</div>
			</div>

		);
	}

}
