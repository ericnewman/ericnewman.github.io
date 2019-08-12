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
	tickSession() {
		this.sessionLength += 15;

		ReactGA.event({
			category: 'Session Length',
			action: 'Session Continuing',
			label: this.sessionLength.toString(10),
			nonInteraction: false
		});

		let playsRef = database.ref('users/' + auth.currentUser.uid + '/total_session_duration');
		playsRef.transaction((totalDuration) =>
			// If numberOfTimesPlayed has never been set, numberOfTimesPlayed will be `null`.
			(totalDuration || 0) + 15
		);
		if (this.sessionLength >= 600) {
			clearInterval(this.timer);
		}
	}

	doGameStarted() {

		this.sessionLength = 1;
		let bonus = this.bonusPts[this.state.bonusIndex];
		let fastStarts = this.state.canFastStart;

		ReactGA.event({
			category: 'Game Start',
			action: gamesList[this.props.selectedGame].name,
			value: bonus
		});

		this.timer = setInterval(() => {
			this.tickSession();
		}, 15000);



		if(fastStarts.includes(',' + this.props.selectedGame + ',')) {
			bonus = 0;
			console.log('No fast Start Bonus');

		} else {
			localStorage.setItem('fastStarts', fastStarts + this.props.selectedGame + ',');
			let playsRef = database.ref('users/' + auth.currentUser.uid + '/score');
			playsRef.transaction((totalScore) =>
				// If numberOfTimesPlayed has never been set, numberOfTimesPlayed will be `null`.
				(totalScore || 0) + bonus
			);
			fastStarts = fastStarts + this.props.selectedGame + ','
		}
		this.setState({ gameStarted: true, playMsg: 'Rate this game and be heard!' , bonusIndex: 0 , canFastStart: fastStarts});


	}
	timedOut() {
		this.setState({ tooLate: true });
	}

	constructor(props) {
		super(props);

		this.bonusPts = [0,300,200,100];

		this.sessionLength=0;

		let hasSeen = false;
		let canFastStart = ',';

		if (typeof window !== 'undefined') {
			hasSeen = localStorage.getItem('seenWelcomeMessage');
			canFastStart = localStorage.getItem('fastStarts') || ',';

		}

		this.state = {
			snooze: false,
			snooze_time: 0,
			gameStarted: false,
			canFastStart: canFastStart,
			playMsg: 'Tap to Play now!',
			bonusIndex: 0,
			bonusMsg: ['', 'Play now for', 'Play to earn', 'Hurry. Earn'],
			day1: hasSeen

		};

		this.startSnooze = this.startSnooze.bind(this);
		this.doGameStarted = this.doGameStarted.bind(this);
		this.timedOut = this.timedOut.bind(this);
		this.changeBonus = this.changeBonus.bind(this);
		this.preSnooze = this.preSnooze.bind(this);

		if (typeof window !== 'undefined') {
			localStorage.setItem('highestGameID', (localStorage.getItem('highestGameID') || 1));

			if (this.props.selectedGame) {
				localStorage.setItem('currentGameID', this.props.selectedGame);
				if (this.props.selectedGame > localStorage.getItem('highestGameID')) {
					localStorage.setItem('highestGameID', this.props.selectedGame);
				}
			}


			window.onbeforeunload = (event) => {
				if (this.sessionLength > 0) {
					ReactGA.event({
						category: 'Session Close',
						action: 'Session Closed',
						label: this.sessionLength.toString(10),
						nonInteraction: false
					});

					this.sessionLength = 0;
				}
			};
			window.onblur = (event) => {
				event.preventDefault();
				if (this.sessionLength > 0) {
					ReactGA.event({
						category: 'Session Blurred',
						action: 'Session Blurred',
						label: this.sessionLength.toString(10),
						nonInteraction: false
					});

					this.sessionLength = 0;
				}
			};
		}
	}

	componentWillUnmount() {  // Stop counting game clock time.
		clearInterval(this.timer);
		this.timer = null;

		if (this.sessionLength > 0) {
			ReactGA.event({
				category: 'Session End',
				action: 'Session Ending',
				label: this.sessionLength.toString(10),
				nonInteraction: false
			});

			this.sessionLength = 0;
		}
	}

	render({ selectedGame }, state) {

		const kTopBarHeight = 56;
		const kFooterBarHeight = 68;
		const kCountDownBarHeight = 30;

		let hgt = 640;
		if (typeof window !== "undefined") {
			hgt = (document.documentElement.clientHeight - (kTopBarHeight + kFooterBarHeight + kCountDownBarHeight));
		}

		if (state.gameStarted) {
			hgt += kCountDownBarHeight;
		}
		let url = gamesList[selectedGame].url;
		let showCountdown = !state.canFastStart.includes(',' + selectedGame + ',');

		return (
			<div id="home" class={style.dash}>
				{!state.snooze &&
				<div>
					{!state.gameStarted && showCountdown && <Countdown afterAction={this.timedOut} changeBonus={this.changeBonus} />}
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
