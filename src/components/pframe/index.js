import { h, Component } from 'preact';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import { notify } from 'react-notify-toast';

import style from './style';
import { auth, database } from "../../firebase";

import gamesList from '../../gamesList';

export default class PFrame extends Component {


	constructor (props) {


		super(props);
		this.clicked = false;
		this.state.blurred = false;
		this.state.hovering = false,
		this.onBlur = this.onBlur.bind(this);
		this.onHover = this.onHover.bind(this);
		this.onHoverExit = this.onHoverExit.bind(this);
		this.onClick = this.onClick.bind(this);
		this.onCancel = this.onCancel.bind(this);
		this.games= [];
		if (typeof window !== 'undefined') {
			let s = JSON.parse(localStorage.getItem('savedFavorite'));
			if (s && s.favoriteGameID !== -1) {
				this.setState(s);
			}

			gamesList.map((game) => {
				this.games[game.id] = game;
			});
		}
	}

	componentDidMount() {
		addEventListener('click', this.onClick);
		addEventListener('blur', this.onBlur);
		addEventListener('mouseover', this.onHover);
		addEventListener('mouseout', this.onHoverExit);
		addEventListener('touchend', this.onCancel);
		addEventListener('touchstart', this.onClick);
		addEventListener('touchcancel', this.onCancel);

		let id = JSON.parse(localStorage.getItem('savedFavorite')).favoriteGameID;

		let name = this.games[id].name;

		this.props.gameID = id;

		if (auth && auth.currentUser) {
			let name = this.games[id].name;


			let playsRef = database.ref('users/' + auth.currentUser.uid + '/games_played/' + name + '/times_played');

			playsRef.on('value', (childSnapshot) => {

				// handle read data.
				let childData = childSnapshot.val();
				this.setState({
						currentPlays: childData
					});
				});
			}
	}
	componentWillUnmount() {
		this.componentDidUnmount();
	}
	componentDidUnmount() {
		removeEventListener('click', this.onClick);
		removeEventListener('blur', this.onBlur);
		removeEventListener('mouseover', this.onHover);
		removeEventListener('mouseout', this.onHoverExit);
		removeEventListener('touchend', this.onCancel);
		removeEventListener('touchstart', this.onClick);
		removeEventListener('touchcancel', this.onCancel);
	}


	onClick(e) {
		this.state.click = !this.state.click;
		this.setState(this.state);
		this.showToast('Click');
		//this.props.gameClick();

	}
	onBlur(e) {
		let el = e.target.document.activeElement.id;
		console.log(el);

		if(el === 'gameFrame') {
			this.playGame();
			this.showToast('Game Start Detected');
		}
		this.setState({
			blurred: !this.state.blurred
		});
	}
	onHover(e) {
		this.showToast('Hover');
		this.state.hovering = true;
		this.setState(this.state);
	}
	onHoverExit(e) {
		this.showToast('HoverExit');
		this.state.hovering = false;
		this.setState(this.state);
	}
	onCancel(e) {
		this.showToast('onCancel');
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
		let id = JSON.parse(localStorage.getItem('savedFavorite')).favoriteGameID;

		let name = this.games[id].name;
		let playsRef = database.ref('users/' + auth.currentUser.uid + '/games_played/' + name + '/times_played');

		console.log(name, id, playsRef);

		playsRef.transaction((numberOfTimesPlayed) => {
				// If numberOfTimesPlayed has never been set, numberOfTimesPlayed will be `null`.
				(numberOfTimesPlayed || 0) + 1;
			console.log(numberOfTimesPlayed);

			this.setState({
						currentPlays: numberOfTimesPlayed
				});
			}
		);

	}


	render (props, state) {

		return (
			<div>
				<iframe {...this.props} class={style.framey} />
			<div class={style.plays} > You have played: {state.currentPlays} Times</div>
			</div>

	);
	}

}
