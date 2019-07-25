import { Component } from 'preact';
import { route } from 'preact-router';

import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';

import Button from 'preact-material-components/Button';

import style from './style';
import CoinBar from '../../components/coinbar';
import { auth, database } from '../../firebase';


export default class Outcome extends Component {

	componentWillMount() {

		if (typeof window !== "undefined") {
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
			finished1: false,
			finished2: false,
			user: {
				totalVisits: 0,
				totalPlays: 0,
				totalSnoozes: 0,
				unique_day_count: 0
			}
		};
	}


	render(props, state) {
		let expectedDailyPVs = 2.0;
		let campaignLength = 14.0;
		let campprog = (campaignLength/state.user.unique_day_count).toFixed(2);;

		let engagement = (state.user.totalVisits/expectedDailyPVs)/state.user.totalPlays;
		let rank = (state.user.unique_day_count * expectedDailyPVs)/state.user.totalPlays;

		return (
			<div class={`${style.home} page`}>
				<div>
					<div><p /></div>
					<div class={style.beta}>DRAFTCARDS</div>
					<div class={style.smaller}>Thank you fearless adventurer.</div>
					<div><p /></div>
					{!state.finished1 && <div>
						<div class={style.smaller}>We'll see you again soon for your next mission in THE QUEST.
						</div>
						<div className={style.smaller}>In the mean time, rest your thumbs, and be sure to take
							nourishment.
						</div>
					</div>
					}
					{!state.finished1 && <div>
						<div class={style.smaller}>Remember, you can save this app to your phone's home screen, and
							play whenever for additional missions and rewards.
						</div>
						<div class={style.cent}>
							<Button raised ripple dense class={style.rose}
								onClick={() => this.setState({ finished1: true })}
							>
								How'd I do?
							</Button>
						</div>

					</div>
					}
					{state.finished1 && <div className={style.cent}>

						<CoinBar title="Campaign Progress" progress={campprog*100} color={'#808'} percent/>
						<div className={style.smallest}>Overall Campaign Progress</div>
						<CoinBar title="Visits" progress={state.user.totalVisits} color={'#800'} />
						<div class={style.smallest}>Equivalent to PageViews</div>
						<CoinBar title="Plays" progress={state.user.totalPlays} color={'#080'}  />
						<div className={style.smallest}>Measure of game starts</div>
						<CoinBar title="Snoozes" progress={state.user.totalSnoozes} color={'#CC0'}  />
						<div className={style.smallest}>Number of Snoozes</div>
						<CoinBar title="Unique Days" progress={state.user.unique_day_count} color={'#38f'}  />
						<div className={style.smallest}>Separate days visits occurred</div>
						<CoinBar title="Engagement" progress={engagement} color={'#38f'} percent />
						<div className={style.smallest}>Visits/Plays</div>
						<CoinBar title="Ranking" progress={rank} color={'#0cc'}  />
						<div className={style.smallest}>True Score</div>
					</div>
					}
					<div className={style.cent}>
						<Button raised ripple dense class={style.green}
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
