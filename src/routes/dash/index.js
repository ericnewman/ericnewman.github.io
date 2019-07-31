import { Component } from 'preact';
import Pframe from '../../components/pframe';
import PFooter from '../../components/pfooter';
import Countdown from '../../components/countdown';
import ReactGA from 'react-ga';

import gamesList from '../../gamesList';
import { auth, database } from '../../firebase';

import 'preact-material-components/Card/style.css';

import style from './style';

export default class Dash extends Component {

	preSnooze() {
		this.setState({
			tooLate: true,
			bonusIndex: 0
		});
	}


	startSnooze(time) {
		console.log('snoozing');

		this.setState({ snooze: true , snooze_time: time });
		this.changeBonus(0);
		let playsRef = database.ref('users/' + auth.currentUser.uid + '/totalSnoozes');
		playsRef.transaction((totalPlays) =>
			// If numberOfTimesPlayed has never been set, numberOfTimesPlayed will be `null`.
			(totalPlays || 0) + 1
		);
	}
	changeBonus(index) {
		if (index !== this.state.bonusIndex) {
			this.setState({ bonusIndex: index });
		}
	}
	cancelSnooze() {
		this.setState({ snooze: false, gameStarted: false, tooLate: false, snooze_time: 0 });
	}

	doGameStarted() {

		ReactGA.event({
			category: 'Game Start',
			action: gamesList[this.props.selectedGame].name,
			value: this.bonusPts[this.state.bonusIndex]
		});

		this.setState({ gameStarted: true, playMsg: 'Rate this game and be heard!' , bonusIndex: 0 });
		let playsRef = database.ref('users/' + auth.currentUser.uid + '/score');
		playsRef.transaction((totalScore) =>
			// If numberOfTimesPlayed has never been set, numberOfTimesPlayed will be `null`.
			(totalScore || 0) + this.bonusPts[this.state.bonusIndex]
		);

	}
	timedOut() {
		this.setState({ tooLate: true });
	}

	constructor(props) {
		super(props);

		this.bonusPts = [0,300,200,100];

		this.state = {
			snooze: false,
			snooze_time: 0,
			gameStarted: false,
			playMsg: 'Tap to Play now!',
			bonusIndex: 0,
			bonusMsg: ['', 'Play now for', 'Play to earn', 'Hurry. Earn'],
			day1: localStorage.getItem('seenWelcomeMessage')

	};

		this.startSnooze = this.startSnooze.bind(this);
		this.doGameStarted = this.doGameStarted.bind(this);
		this.timedOut = this.timedOut.bind(this);
		this.changeBonus = this.changeBonus.bind(this);
		this.preSnooze = this.preSnooze.bind(this);

	}

	render({ selectedGame }, state) {

		const kTopBarHeight = 56;
		const kFooterBarHeight = 68;
		const kCountDownBarHeight = 30;
		let msgStyle = '';

		let hgt = (document.documentElement.clientHeight - (kTopBarHeight + kFooterBarHeight + kCountDownBarHeight));
		if (state.gameStarted) {
			hgt += kCountDownBarHeight;
		}
		let url = gamesList[selectedGame].url;

		if (state.bonusIndex === 4) {
			msgStyle = 'intro';
		}

		return (
			<div id="home" class={style.dash}>
				{!state.snooze &&
				<div>
					{!state.gameStarted && <Countdown afterAction={this.timedOut} changeBonus={this.changeBonus} />}
					<Pframe src={url}
						width="100%"
						height={hgt}
						name="gameFrame"
						id="gameFrame"
						scrolling="no"
						class={style.framey}
						display="initial"
						position="relative"
						game_id={selectedGame}
						doGameStarted={this.doGameStarted}
					 />
					{!state.tooLate && !state.gameStarted &&
					state.bonusIndex > 0 &&
					<div class={`${style.bonusMsg} {msgStyle} btn1}`}>
						<div class={style.bonus}>{state.bonusMsg[state.bonusIndex]}
							<span class={style.bonusPts}>{this.bonusPts[state.bonusIndex]}</span>
							Points</div>
					</div>
					}
					<PFooter name={gamesList[selectedGame].name}
						showStars={state.gameStarted}
						game_id={selectedGame}
						snoozer={this.startSnooze}
						gameClick={this.doGameStarted}
						gameMsg={state.playMsg}
						preSnooze={this.preSnooze}
					/>
				</div>
				}
			</div>

		)
		;
	}
}
