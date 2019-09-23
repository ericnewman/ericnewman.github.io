import { Component } from 'preact';
import { route } from 'preact-router';
import Button from 'preact-material-components/Button';

import ScoreBar from '../scorebar';

import style from './style';


import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';

// 	10 games deliveries
// 	100 to 300 to play
// 	200 to Rate
// 	Max score: 5000
//
// 	Health
// -the number of snoozes left.
// -start with 10
//
// 	Play Cred
// -novice: 0 to 1499
// -intermediate: 1500 to 2999
// -pro: 3000 to 4499
// -elite: 4500 and up

const maxScore =  6000,
	maxSnoozes = 10,
	rankings = ['Novice', 'Intermediate', 'Pro', 'Elite', 'Elite+', 'Elite++'];


export default class Outcome extends Component {


	constructor(props) {
		super(props);

		this.state = {
			user: {
				games_played: {},
				latest_visit: 0,
				totalVisits: 0,
				totalPlays: 0,
				gamerrank: 0,
				score: 0,
				snoozes: 0,
				unique_day_count: 0
			}
		};
	}

	componentDidMount() {
		// User is signed in.
		auth.signInAnonymously().catch((error) => {
			// Handle Errors here.
			// let errorCode = error.code;
			// let errorMessage = error.message;
			// ...
		});
		auth.onAuthStateChanged((user) => {
			if (user) {

				let playsRef = database.ref('users/' + auth.currentUser.uid);
				playsRef.on('value', (snapshot) => {
					this.setState({ user: snapshot.val() });
				});
			}
		});


	}

	render(props, state) {
		//let expectedDailyPVs = 1.0;
		//let campaignLength = 10.0;
		// let campprog = (state.user.unique_day_count/campaignLength*100).toFixed(2);
		// let playprog = (state.user.totalPlays/campaignLength*100).toFixed(2);

		let score = (state.user.score <= maxScore) ? state.user.score : maxScore;

		let rank = parseInt(score/1250, 10);
		let snoozes = ((state.user.totalSnoozes <= maxSnoozes) ? state.user.totalSnoozes : maxSnoozes) || 0;
		let snoozeMsg = (maxSnoozes - snoozes) > 0 ? ' You\'ve only got ' + (maxSnoozes - snoozes) + ' left.' :
			' (You\'ve used them all up!)';

		score = score - (snoozes * 100); // Too many snoozes will make you negative...

		if (score < 0) {
			score = 0;
		}

		return (
			<div class="home">
				<div class={style.inner}>
					<div class={style.rankTitle}>Discoverer Ranking:</div>
					<div class={style.rank}>{rankings[rank]}</div>
					<div class="smaller left">You're doing great. Only {maxScore - score} points until you reach Elite status.</div>
					<p />
					<ScoreBar progress={score/maxScore*100}  title={score} color={'#FFB600'}  />

					{state.gameRankAvailable && <div>
						<div class="small">Gamer Ranking:</div>
						<div class={style.rank}>{state.gamerrank}</div>
						<p />
					</div>
					}
					<div class={style.snoozeSec}>
						<div class={style.snoozeIcon} />
						<div class={style.headTxt}>
							<div class={style.headTxt}>
									Snooze Bank
								<div className={style.snoozeScore}>You have used {snoozes} snoozes.</div>
							</div>
						</div>
						<div className={style.label}>Remember! Use your Snoozes sparingly.</div>
					</div>
					<ScoreBar progress={100 - (snoozes/maxSnoozes*100)} title={snoozeMsg}  color={'#FFB600'}  />

					<div className={style.snoozeSec}>

						<Button raised ripple dense class="light_blue"
							onClick={() => 	route('/dash/' + localStorage.getItem('currentGameID') || '1')}
						>
							Play Again
						</Button>
					</div>
				</div>
			</div>
		);
	}
}
