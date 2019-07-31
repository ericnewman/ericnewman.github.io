import { Component } from 'preact';
import Logo from '../../components/logo';

import { auth, database } from '../../firebase';

import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import gamesList from '../../gamesList';

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


export default class Metrics extends Component {

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
						this.setState({ user: snapshot.val(), num_of_users: snapshot.numChildren()});
					});
					playsRef = database.ref('games/');
					playsRef.on('value', (snapshot) => {
						this.setState({ games: snapshot.val() });
					});
					playsRef = database.ref('likesplay/');
					playsRef.on('value', (snapshot) => {
						this.setState({ likesplay: snapshot.val() });
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
			user: {},
			counts: {},
			games: {},
			likesplay: {},
			num_of_users: 0
		};
	}
	gamesTable() {
		let games = this.state.games;
		let str = '';
		Object.keys(games).forEach((key, idx) => {
			str += '<div>' + key + ':';
			Object.keys(games[key]).forEach((ikey, idx) => {
				str += ikey + ':' +  games[key][ikey] + ' ';
			});
			str += '</div>';
		});
		console.log(str);

		return str;
	}

	render(props, state) {
		// let expectedDailyPVs = 2.0;
		// let campaignLength = 10.0;
		// let campprog = (state.user.unique_day_count/campaignLength*100).toFixed(2);
		// let playprog = (state.user.totalPlays/campaignLength*100).toFixed(2);
		//
		// let rank = parseInt(state.user.score/1000);
		let str = '';
		let games = this.state.games;
		let likes = this.state.likesplay;

		console.log(this.state);
		return (
			<div class="home">
				<Logo />
				<div class="smaller">Stats
					<p />
					<div class="smallest left">
						Total Users: {state.num_of_users}
						<p />
						How much do people like playing?{
						Object.keys(likes).map((keys) => (<div><stong>{keys}</stong><ul>
								{
									typeof likes[keys] === 'object' && Object.keys(likes[keys]).map((ikey) => (<li>{ikey}{' : '}
										{likes[keys][ikey]}
									</li>))
								}
								{
									typeof likes[keys] !== 'object' && likes[keys]
								}
							</ul></div>))
						}
						Activity within Games
						{
							Object.keys(games).map((keys) => (<div>{keys}<ul>

								{
									Object.keys(games[keys]).map((ikey) => (<li>{ikey}{' : '}
										{games[keys][ikey]}
									</li>))
								}
							</ul></div>))
						}

					</div>
				</div>

			</div>
		);
	}
}
