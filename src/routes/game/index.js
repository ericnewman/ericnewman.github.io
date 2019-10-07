import { Component } from 'preact';
import Pframe from '../../components/pframe';
import Footer from '../../components/footer';
import Countdown from '../../components/countdown';
import AdUnit from '../../components/adunit';
import ReactGA from 'react-ga';
import { Bling as Gpt } from 'react-gpt';

import { route } from 'preact-router';

import gamesList from '../../gamesList';


import style from './style';

export default class Game extends Component {

	changeBonus(index) {
		if (index !== this.state.bonusIndex) {
			this.setState({ bonusIndex: index });
		}
	}

	tickSession() {
		let sessionLength = this.state.sessionLength + 15;

		if (sessionLength > 0) {
			ReactGA.event({
				category: 'Session Length',
				action: 'Session Continuing',
				label: sessionLength.toString(10),
				nonInteraction: false
			});
		}

		if (sessionLength >= 600) {
			this.stopSessionTimer();
		}
		if (sessionLength % 30 === 0) {
			Gpt.refresh();
		}
		this.setState({ sessionLength });
	}

	doGameStarted() {
		Gpt.refresh();

		let bonus = this.bonusPts[this.state.bonusIndex];

		ReactGA.event({
			category: 'Game Start',
			action: gamesList[this.props.selectedGame].name,
			value: bonus
		});

		this.timer = setInterval(() => {
			this.tickSession();
		}, 15000);
		window.sessionTimer = this.timer;

		this.setState({ gameStarted: true, sessionLength: 0 });
	}

	timedOut() {
		this.setState({ tooLate: true });
	}


	stopSessionTimer() {
		clearInterval(this.timer);
		this.timer = null;
		this.setState({ sessionLength: 0 });
	}

	constructor(props) {
		super(props);

		if ( this.props.selectedGame > gamesList.length) {
			route('404');
		}

		this.bonusPts = [0,300,200,100];

		this.timer=null;

		this.state = {
			snooze: false,
			snooze_time: 0,
			sessionLength: 0,
			gameStarted: false,
			bonusIndex: 0,
			playMsg: 'Tap to Play now!',
			bonusMsg: ['', 'Play now for', 'Play to earn', 'Hurry. Earn']
		};

		this.doGameStarted = this.doGameStarted.bind(this);
		this.changeBonus = this.changeBonus.bind(this);
		this.timedOut = this.timedOut.bind(this);


		if (typeof window !== 'undefined') {
			localStorage.setItem('highestGameID', (localStorage.getItem('highestGameID') || '1'));

			if (this.props.selectedGame) {
				localStorage.setItem('currentGameID', this.props.selectedGame);
				if (this.props.selectedGame > localStorage.getItem('highestGameID')) {
					localStorage.setItem('highestGameID', this.props.selectedGame);
				}
			}

			window.onbeforeunload = (event) => {
				event.preventDefault();

				if (this.state.sessionLength > 0) {
					ReactGA.event({
						category: 'Session Close',
						action: 'Session Closed (unload)',
						label: this.sessionLength.toString(10),
						nonInteraction: false
					});
					clearTimeout(window.sessionTimer);
					window.sessionTimer = null;
					this.stopSessionTimer();
				}
			};

			window.onblur = (event) => {
				event.preventDefault();
				if (this.state.sessionLength > 0) {
					ReactGA.event({
						category: 'Session Blurred',
						action: 'Session Blurred',
						label: this.state.sessionLength.toString(10),
						nonInteraction: false
					});
					clearTimeout(window.sessionTimer);
					window.sessionTimer = null;

					this.stopSessionTimer();
				}
			};
		}
	}

	componentWillUnmount() {  // Stop counting game clock time.
		this.stopSessionTimer();

		if (this.state.sessionLength > 0) {
			ReactGA.event({
				category: 'Session End',
				action: 'Session Ended',
				label: this.state.sessionLength.toString(10),
				nonInteraction: false
			});

			this.setState({ sessionLength: 0 });
		}
	}

	render({ selectedGame }, state) {

		const kTopBarHeight = 56;
		const kFooterBarHeight = 86;
		const kCountDownBarHeight = 32;

		let hgt = 640;
		if (typeof window !== 'undefined') {
			hgt = (document.documentElement.clientHeight - (kTopBarHeight + kFooterBarHeight + kCountDownBarHeight));
		}

		if (state.gameStarted) {
			hgt += kCountDownBarHeight;
		}

		let url = gamesList[selectedGame].url;
		let intro = gamesList[selectedGame].intro;

		return (
			<div id="home" class={style.dash}>
				{!state.snooze &&
				<div>
					{!state.gameStarted &&
					<Countdown afterAction={this.timedOut} changeBonus={this.changeBonus} game={selectedGame} />}

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
						title="Game Frame"
					/>

					{!state.gameStarted && state.bonusIndex > 0 &&
						<div class={`${style.bonusMsg} {msgStyle} btn1}`}>
							<div class={style.bonus}>
								{intro}
							</div>
						</div>
					}

					<Footer
						gameMsg={state.playMsg}
						game_id={selectedGame}
						started={state.gameStarted}
						elapsed={state.sessionLength}
					/>
					<AdUnit adPath="/180049092/TEST_GAMES_WVIEW_EN_TOP" />
				</div>
				}
			</div>

		)
		;
	}
}