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

	cancelSnooze() {
		this.setState({ snooze: false, gameStarted: false, tooLate: false, snooze_time: 0 });
	}

	doGameStarted() {
		this.setState({ gameStarted: true });
	}
	timedOut() {
		this.setState({ tooLate: true });
	}

	constructor(props) {
		super(props);

		this.state = {
			snooze: false,
			snooze_time:0,
			gameStarted: false

		};

		this.startSnooze = this.startSnooze.bind(this);
		this.doGameStarted = this.doGameStarted.bind(this);
		this.timedOut = this.timedOut.bind(this);
	}

	render({ selectedGame }, state) {

		const kTopBarHeight = 56;
		const kFooterBarHeight = 60;
		let hgt = (window.innerHeight - kTopBarHeight - kFooterBarHeight-22);
		if (state.gameStarted) {
			hgt += 32;
		}
		let url = gamesList[selectedGame].url;

		return (
			<div id="home" class={style.dash}>
				{!state.gameStarted &&  !state.snooze && <Countdown afterAction={this.timedOut} />}
				<div>
					{!state.tooLate && !state.snooze && <Pframe src={url}
						width="100%"
						height={hgt}
						name="gameFrame"
						id="gameFrame"
						className={style.framey}
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

					{!state.tooLate && <PFooter name={gamesList[selectedGame].name} showStars={state.gameStarted}
						game_id={selectedGame} snoozer={this.startSnooze}
					                   />}
				</div>
			</div>

		)
		;
	}
}
