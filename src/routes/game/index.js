import { Component } from 'preact';
import Pframe from '../../components/pframe';
import Footer from '../../components/footer';
import Countdown from '../../components/countdown';
import Preview from '../../components/preview';
import AdUnit from '../../components/adunit';
import ReactGA from 'react-ga';
import { Bling as Gpt } from 'react-gpt';

import { route } from 'preact-router';

import gamesList from '../../gamesList';


import style from './style.scss';

export default class Game extends Component {


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
	previewtimedOut() {
		this.setState({ previewed: true });
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

		this.timer = null;

		this.state = {
			tooLate: false,
			sessionLength: 0,
			gameStarted: false,
			playMsg: 'Tap to Play now!',
			previewed: false,
			showIntro: true
		};

		this.doGameStarted = this.doGameStarted.bind(this);
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
				{!state.gameStarted &&state.showIntro && <div className={style.bonusMsg}>
					{intro}
				</div>
				}

				{!state.snooze &&
				<div>
					{!state.tooLate && <Countdown afterAction={this.timedOut}  game={selectedGame} gamestarted={state.gameStarted} />}
					{state.gameStarted && <Preview  afterAction={this.timedOut} game={selectedGame} />}

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
