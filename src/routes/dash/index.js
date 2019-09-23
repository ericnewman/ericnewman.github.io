import { Component } from 'preact';
import Pframe from '../../components/pframe';
import PFooter from '../../components/pfooter';
// import Countdown from '../../components/countdown';
import ReactGA from 'react-ga';
import { Bling as Gpt } from 'react-gpt';

import { route } from 'preact-router';

import gamesList from '../../gamesList';

import 'preact-material-components/Card/style.css';

import style from './style';

export default class Dash extends Component {

	tickSession() {
		this.sessionLength += 15;

		if (this.sessionLength > 0) {
			ReactGA.event({
				category: 'Session Length',
				action: 'Session Continuing',
				label: this.sessionLength.toString(10),
				nonInteraction: false
			});
		}

		if (this.sessionLength >= 600) {
			this.stopSessionTimer();
		}
		if (this.sessionLength % 30 === 0) {
			Gpt.refresh();

		}
	}

	doGameStarted() {

		this.sessionLength = 0;
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

		this.setState({ gameStarted: true });
	}

	stopSessionTimer() {
		clearInterval(this.timer);
		this.timer = null;
		this.sessionLength=0;
	}

	constructor(props) {
		super(props);

		if ( this.props.selectedGame > gamesList.length) {
			route('404');
		}

		this.bonusPts = [0,300,200,100];

		this.sessionLength=0;
		this.timer=null;

		this.state = {
			snooze: false,
			snooze_time: 0,
			gameStarted: false,
			playMsg: 'Tap to Play now!'
		};

		this.doGameStarted = this.doGameStarted.bind(this);

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

				if (this.sessionLength > 0) {
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
				if (this.sessionLength > 0) {
					ReactGA.event({
						category: 'Session Blurred',
						action: 'Session Blurred',
						label: this.sessionLength.toString(10),
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

		if (this.sessionLength > 0) {
			ReactGA.event({
				category: 'Session End',
				action: 'Session Ended',
				label: this.sessionLength.toString(10),
				nonInteraction: false
			});

			this.sessionLength = 0;
		}
	}

	render({ selectedGame }, state) {

		const kTopBarHeight = 56;
		const kFooterBarHeight = 50;
		const kCountDownBarHeight = 0;
		const kPlayReminder = 0;

		let hgt = 640;
		if (typeof window !== 'undefined') {
			hgt = (document.documentElement.clientHeight - (kTopBarHeight + kFooterBarHeight + kCountDownBarHeight));
		}

		if (state.gameStarted) {
			hgt += (kCountDownBarHeight + kPlayReminder);
		}
		let url = gamesList[selectedGame].url;
		let intro = gamesList[selectedGame].intro;

		return (
			<div id="home" class={style.dash}>
				{!state.snooze &&
				<div>
					{/*{!state.gameStarted &&}
					<Countdown afterAction={this.timedOut} changeBonus={this.changeBonus} game={selectedGame} />}*/}
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
					{!state.gameStarted && state.bonusIndex > 0 &&
						<div class={`${style.bonusMsg} {msgStyle} btn1}`}>
							{/*<div class={style.bonus}>{state.bonusMsg[state.bonusIndex]}*/}
							{/*	<span class={style.bonusPts}>{this.bonusPts[state.bonusIndex]}</span>*/}
							{/*	Points*/}
							{/*</div>*/}
							<div class={style.bonus}>
								{intro}
							</div>
						</div>
					}
					{!state.gameStarted && <PFooter
						gameClick={this.doGameStarted}
						gameMsg={state.playMsg}
					                       />}
					<div class={style.adfooter}>
						<div id="ad1">
							<Gpt
								adUnitPath="/4595/nfl.test.open"
								sizeMapping={[
									{ viewport: [0, 0], slot: [320, 50] },
									{ viewport: [750, 0], slot: [728, 90] },
									{ viewport: [1050, 0], slot: [1024, 120] }
								]}
							/>
						</div>
					</div>
				</div>
				}
			</div>

		)
		;
	}
}
