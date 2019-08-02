import { Component } from 'preact';
import { route } from 'preact-router';
import Logo from '../../components/logo';
import Button from 'preact-material-components/Button';

import ScoreBar from '../../components/scorebar';

import style from './style';

import { auth, database } from '../../firebase';

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
// -novice: 0 to 999
// -intermediate: 1000 to 1999
// -pro: 2000 to 2999
// -elite: 3000 and up

const number_of_game_deliveries = 10,
	max_score =  6000,
	max_snoozes = 10,
	rankings = ['Novice', 'Intermediate', 'Pro', 'Elite', 'Elite+', 'Elite++'];


export default class Outcome extends Component {

	componentWillMount() {

		if (typeof window !== 'undefined') {
			auth.signInAnonymously().catch((error) => {
				// Handle Errors here.
				// let errorCode = error.code;
				// let errorMessage = error.message;
			});

			auth.onAuthStateChanged(user => {
				if (user) {
					// User is signed in.
					let playsRef = database.ref('users/' + auth.currentUser.uid);
					playsRef.on('value', (snapshot) => {
						this.setState({ user: snapshot.val() });
					});
				}
				else {
					// User is signed out.
					// ...
				}
			});
		}
	}

	constructor(props) {
		super(props);

		this.state = {
			user: {
				games_played: {},
				latest_visit: 0,
				totalVisits: 0,
				totalPlays: 0,
				score: 0,
				snoozes: 0,
				unique_day_count: 0
			}
		};
	}


	render(props, state) {
		//let expectedDailyPVs = 1.0;
		//let campaignLength = 10.0;
		// let campprog = (state.user.unique_day_count/campaignLength*100).toFixed(2);
		// let playprog = (state.user.totalPlays/campaignLength*100).toFixed(2);

		let score = (state.user.score <= max_score) ? state.user.score : max_score;
		let rank = parseInt(score/1250);
		let snoozes = (state.user.totalSnoozes <= max_snoozes) ? state.user.totalSnoozes : max_snoozes;
		let snoozeMsg = (max_snoozes - snoozes) > 0 ? ' You\'ve only got ' + (max_snoozes - snoozes) + ' left.' :
			' (You\'ve used them all up!)';

		score = score - (state.user.totalSnoozes * 100);

		return (
			<div class="home">
				<Logo />
				<div class={style.inner}>
					<div class={style.rankTitle}>Discoverer Ranking:</div>
					<div class={style.rank}>{rankings[rank]}</div>
					<div class="smaller left">You're doing great. Only {max_score - score} points until you reach Elite status.</div>
					<p />
					<ScoreBar progress={score/max_score*100}  title={score} color={'#FFB600'}  />

					{state.gameRankAvailable && <div>
						<div class="small">Gamer Ranking:</div>
						<div class={style.rank}>{gamerrank}</div>
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
					<ScoreBar progress={100 - (snoozes/max_snoozes*100)} title={snoozeMsg}  color={'#FFB600'}  />

					<div className={style.snoozeSec}>

						<Button raised ripple dense class="light_blue"
							onClick={() => route('/dash/1')}
						>
							Play Again
						</Button>
					</div>
				</div>
			</div>
		);
	}
}
