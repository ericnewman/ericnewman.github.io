import { Component } from 'preact';
import Pframe from '../../components/pframe';
import PFooter from '../../components/pfooter';
import Countdown from '../../components/countdown';
import Snooze from '../../components/snooze';
import Button from 'preact-material-components/Button';

import gamesList from '../../gamesList';
import { auth, database } from '../../firebase';

import 'preact-material-components/Card/style.css';

import style from './style';

export default class Dash extends Component {


	startSnooze(time) {
		this.setState({ snooze: true , snooze_time: time});
		let playsRef = database.ref('users/' + auth.currentUser.uid + '/totalSnoozes');
		playsRef.transaction((totalPlays) =>
			// If numberOfTimesPlayed has never been set, numberOfTimesPlayed will be `null`.
			(totalPlays || 0) + 1
		);
	}
	changeBonus(index) {
		if(index !== this.state.bonusIndex) {
			this.setState({ bonusIndex: index });
		}
	}
	cancelSnooze() {
		this.setState({ snooze: false, gameStarted: false, tooLate: false, snooze_time: 0});
	}

	doGameStarted() {
		this.setState({ gameStarted: true, playMsg: 'Rate this game and be heard!' , bonusIndex:0 });
	}
	timedOut() {
		this.setState({ tooLate: true });
	}

	constructor(props) {
		super(props);

		this.state = {
			snooze: false,
			snooze_time:0,
			gameStarted: false,
			playMsg: 'Tap to Play now!',
			bonusIndex:0,
			bonusMsg: ['', 'Play now for', 'Play to earn', 'Hurry. Earn'],
			bonusPts: [0,300,200,100]
		};

		this.startSnooze = this.startSnooze.bind(this);
		this.doGameStarted = this.doGameStarted.bind(this);
		this.timedOut = this.timedOut.bind(this);
		this.changeBonus = this.changeBonus.bind(this);
	}

	render({ selectedGame }, state) {

		const kTopBarHeight = 56;
		const kFooterBarHeight = 60;
		let hgt = (window.innerHeight - kTopBarHeight - kFooterBarHeight-75);
		if (state.gameStarted) {
			hgt += 32;
		}
		let url = gamesList[selectedGame].url;

		return (
			<div id="home" class={style.dash}>
				{!state.gameStarted &&  !state.snooze && <Countdown afterAction={this.timedOut} changeBonus={this.changeBonus}/>}
				<div>
					{!state.tooLate && !state.snooze && <Pframe src={url}
						width="100%"
						height={hgt}
						name="gameFrame"
						id="gameFrame"
						class={style.framey}
						display="initial"
						position="relative"
						game_id={selectedGame}
						doGameStarted={this.doGameStarted}
					                                    />}
					{state.tooLate && <div class={style.info}>
						<div class={style.smaller}>
						Sorry friend, you snooze, you lose! Better luck next time...
							<div className={style.cent}>
								<Button  raised ripple dense class={style.rose}
									onClick={() => this.cancelSnooze()}
								>
								Try Again...
								</Button>
							</div>
						</div>
					</div>}
					{!state.tooLate && state.snooze && <div class={style.info}>
						<Snooze />
						<div className={style.cent}>
							<Button  raised ripple dense class={style.rose}
								onClick={() => this.cancelSnooze()}
							>
								Go Back
							</Button>
						</div>
					</div>
					}
					{!state.tooLate &&
						state.bonusIndex > 0 &&
							<div className={`${style.bonusMsg} btn1}`}>{state.bonusMsg[state.bonusIndex]} <span class={style.bonusPts}>{state.bonusPts[state.bonusIndex]}</span> Points</div>}
					{!state.tooLate &&
					<PFooter name={gamesList[selectedGame].name}
							 showStars={state.gameStarted}
							 game_id={selectedGame}
							 snoozer={this.startSnooze}
							 gameClick={this.doGameStarted}
							 gameMsg={state.playMsg}
					                   />}
				</div>
			</div>

		)
		;
	}
}
