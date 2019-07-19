import { Component } from 'preact';
import Pframe from '../../components/pframe';
import PFooter from '../../components/pfooter';
import Countdown from '../../components/countdown';
import Notifications from 'react-notify-toast';

import style from './style';
import 'preact-material-components/Card/style.css';

import gamesList from '../../gamesList';
import Button from 'preact-material-components/Button';
import { route } from 'preact-router';


export default class Dash extends Component {


	startSnooze() {
		this.setState({ snooze: true });
	}

	doGameStarted() {
		this.setState({ gameStarted: true });
	}
	timedOut() {
		this.setState({ tooLate: true });
		console.log('Too Late');

	}
	constructor(props) {
		super(props);

		this.state = {
			snooze: false,
			gameStarted: false

		};

		this.startSnooze = this.startSnooze.bind(this);
		this.doGameStarted = this.doGameStarted.bind(this);
		this.timedOut = this.timedOut.bind(this);
	}

	render({ selectedGame }, state) {

		const kTopBarHeight = 56;
		const kFooterBarHeight = 100;
		let hgt = (window.innerHeight - kTopBarHeight - kFooterBarHeight - 22);
		if (state.gameStarted) {
			hgt += 32;
		}
		let url = gamesList[selectedGame].url;

		return (
			<div className={`${style.home} page`}>
				{!state.gameStarted && <Countdown afterAction={this.timedOut}/>}
				<div>
					{!state.tooLate &&<Pframe src={url}
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
					{state.tooLate && <div class={style.smaller}>
						Sorry friend, you snooze, you lose! Better luck next time...
						<div className={style.cent}>
							<Button  raised ripple dense class={style.green}
									 onClick={() => route('/dash/1')}
							>
								Try Again...
							</Button>
						</div>

					</div>}
					{!state.tooLate && <PFooter name={gamesList[selectedGame].name} showStars={state.gameStarted}
							 snoozer={this.startSnooze} game_id={selectedGame}/>}
					<Notifications options={{ zIndex: 200, top: '180px' }}/>
				</div>
			</div>

		)
			;
	}
}
