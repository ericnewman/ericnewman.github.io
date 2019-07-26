import { Component } from 'preact';
import { route } from 'preact-router';
import Logo from '../../components/logo';
import Button from 'preact-material-components/Button';

import CoinBar from '../../components/coinbar';
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
	max_score =  5000,
	rankings = ['Novice', 'Intermediate', 'Pro', 'Elite'];


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
		let expectedDailyPVs = 2.0;
		let campaignLength = 10.0;
		let campprog = (state.user.unique_day_count/campaignLength*100).toFixed(2);
		let playprog = (state.user.totalPlays/campaignLength*100).toFixed(2);

		let rank = parseInt(state.user.score/1000);
		console.log(rankings[rank]);

		return (
			<div class="home">
				<Logo />
				<div class="smaller">Thank you, fearless adventurer.
					<p />
					Remember, you can save this app to your phone's home screen, and
							play whenever for additional missions and rewards.
					<div class="cent">

						<CoinBar title="Current Score" progress={state.user.score/max_score*100} score={state.user.score} color={'#FF0'}  />
						<div class="smallest">Overall Campaign Progress (out of {campaignLength} days...)</div>
						<CoinBar title="Campaign Progress" progress={campprog} score={state.user.unique_day_count} color={'#808'}  />
						<div class="smallest">Overall Campaign Progress (out of {campaignLength} days...)</div>
						<CoinBar title="Visits" progress={state.user.totalVisits} score={state.user.totalVisits} color={'#800'} />
						<div class="smallest">Equivalent to PageViews</div>
						<CoinBar title="Plays" progress={state.user.playprog} score={state.user.totalVisits}color={'#080'}  />
						<div class="smallest">Measure of game starts</div>
						<CoinBar title="Snoozes" progress={state.user.totalSnoozes} score={state.user.totalSnoozes} color={'#CC0'}  />
						<div class="smallest">Number of Snoozes</div>
						<p />
						Ranking: {rankings[rank]}
						<p />
						<p />

						{/*<CoinBar title="Unique Days" progress={state.user.unique_day_count} color={'#38f'}  />*/}
						{/*<div class="smallest">Separate days visits occurred</div>*/}
						{/*<CoinBar title="Ranking" progress={rank} color={'#0cc'}  />*/}
						{/*<div class="smallest">True Score</div>*/}
						<Button raised ripple dense class="yellow"
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
