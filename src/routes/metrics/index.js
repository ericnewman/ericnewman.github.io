import { Component } from 'preact';

import { auth, database } from '../../firebase';

import style from './style';

// 	10 games deliveries
// 	100 to 300 to play
// 	200 to Rate
// 	Max score: 6000
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

//const rankings = ['Novice', 'Intermediate', 'Pro', 'Elite'];


export default class Metrics extends Component {


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

		return str;
	}

	constructor(props) {
		super(props);

		this.state = {
			user: {},
			games: {},
			likesplay: {},
			likedplay: {},
			num_of_users: {},
			pageviews: {},
			comments: {},
			num_of_comments: 0
		};

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
						this.setState({ num_of_users: snapshot.numChildren() });
					});
					playsRef = database.ref('games/');
					playsRef.on('value', (snapshot) => {
						this.setState({ games: snapshot.val() });
					});
					playsRef = database.ref('likesplay/');
					playsRef.on('value', (snapshot) => {
						this.setState({ likesplay: snapshot.val() });
					});
					playsRef = database.ref('likedplay/');
					playsRef.on('value', (snapshot) => {
						this.setState({ likedplay: snapshot.val() });
					});
					playsRef = database.ref('pageview/');
					playsRef.on('value', (snapshot) => {
						this.setState({ pageviews: snapshot.val() });
					});
					playsRef = database.ref('comments/');
					playsRef.on('value', (snapshot) => {
						this.setState({ num_of_comments: snapshot.numChildren() });
					});
					playsRef = database.ref('comments').limitToLast(10);
					playsRef.on('value', (snapshot) => {
						this.setState({ comments: snapshot.val() });

					});

				}
				else {
					// User is signed out.
					// ...
				}
			});

		}

	}


	render(state) {
		// let expectedDailyPVs = 2.0;
		// let campaignLength = 10.0;
		// let campprog = (state.user.unique_day_count/campaignLength*100).toFixed(2);
		// let playprog = (state.user.totalPlays/campaignLength*100).toFixed(2);
		//
		// let rank = parseInt(state.user.score/1000);
		let user = this.state.user || {};
		let games = this.state.games || {};
		// let likes = this.state.likesplay || {};
		let liked = this.state.likedplay || {};
		let pageviews = this.state.pageviews || {};
		let comments = this.state.comments || {};
		let goodFields = ['times_played', 'average_rating', 'review_points'];

		return (
			<div class="home">
				<div class="smaller">Stats
					<p />
					<div class={style.report}>
						Total Users: {this.state.num_of_users}<br />
						Total Comments: {this.state.num_of_comments}
						<hr />
						PageViews:{
							Object.keys(pageviews).map((keys) => (<div class="smallerBold">{keys}
								{
									typeof pageviews[keys] === 'object' && Object.keys(pageviews[keys]).map((ikey) => (<div> - {ikey}  :
										{pageviews[keys][ikey]}
									</div>))
								}
								{
									typeof pageviews[keys] !== 'object' && ' : ' + pageviews[keys]
								}
							</div>))
						}
						<hr />
						{/*How much do people like playing?{*/}
						{/*	Object.keys(likes).map((keys) => (<div class="smallerBold">{keys}*/}
						{/*		{*/}
						{/*			typeof likes[keys] === 'object' && Object.keys(likes[keys]).map((ikey) => (<div> - {ikey}  :*/}
						{/*				{likes[keys][ikey]}*/}
						{/*			</div>))*/}
						{/*		}*/}
						{/*		{*/}
						{/*			typeof likes[keys] !== 'object' && ' : ' + likes[keys]*/}
						{/*		}*/}
						{/*	</div>))*/}
						{/*}*/}
						{/*<hr />*/}
						How much did people like playing at the end?{
							Object.keys(liked).map((keys) => (<div class="smallerBold">{keys}
								{
									typeof liked[keys] === 'object' && Object.keys(liked[keys]).map((ikey) => (<div> - {ikey}  :
										{liked[keys][ikey]}
									</div>))
								}
								{
									typeof liked[keys] !== 'object' && ' : ' + liked[keys]
								}
							</div>))
						}
						<hr />
						Activity within Games
						{
							Object.keys(games).map((keys) => (<div class="smallerBold">{keys}<div>
								{
									Object.keys(games[keys]).map((ikey) => {
										if (goodFields.includes(ikey)) {
											return (<div>- {ikey} {' : '} {games[keys][ikey]}</div>);
										}
									})
								}
							</div><br /></div>))
						}
						<hr />
						User
						{
							Object.keys(user).map((keys) => (
								<div class="smallerBold">
									<p />{keys} :
									{
										typeof user[keys] === 'object' && Object.keys(user[keys]).map((ikey) => (<div> - {ikey} :
											{user[keys][ikey]} {user[keys][ikey].times_played}
										</div>))
									}
									{
										typeof user[keys] !== 'object' && user[keys]
									}
								</div>))
						}
						<hr />
						Last 10 Comments {
							Object.keys(comments).map((keys) => (<div class="smallerBold">
								{
									typeof comments[keys] === 'object' && Object.keys(comments[keys]).map((ikey) => (
										<span>{
											comments[keys][ikey]
										} </span>
									))
								}
							</div>))
						}
					</div>
				</div>

			</div>
		);
	}
}
