import { Component } from 'preact';

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
	updateStats() {
		// User is signed in.
		if (auth && auth.currentUser && auth.currentUser.uid) {
			let playsRef = database.ref('users/' + auth.currentUser.uid);
			playsRef.on('value', (snapshot) => {
				this.setState({ user: snapshot.val() || {} });
			});

			let usersRef = database.ref('users/');
			usersRef.on('value', (snapshot) => {
				this.setState({ num_of_users: snapshot.numChildren()});
			});
			playsRef = database.ref('games/');
			playsRef.on('value', (snapshot) => {
				this.setState({ games: snapshot.val() || {}});
			});
			playsRef = database.ref('likesplay/');
			playsRef.on('value', (snapshot) => {
				this.setState({ likesplay: snapshot.val() || {}});
			});
			playsRef = database.ref('likedplay/');
			playsRef.on('value', (snapshot) => {
				this.setState({ likedplay: snapshot.val() || {}});
			});
			playsRef = database.ref('pageview/');
			playsRef.on('value', (snapshot) => {
				this.setState({ pageviews: snapshot.val() || {}});
			});
			playsRef = database.ref('comments/');
			playsRef.on('value', (snapshot) => {
				this.setState({ num_of_comments: snapshot.numChildren() });
			});
			playsRef = database.ref('comments').limitToLast(10);
			playsRef.on('value', (snapshot) => {
				this.setState({ comments: Object.entries(snapshot.val()) });
			});
		}
	}

	constructor(props) {
		super(props);

		this.state = {
			user: {},
			games: {},
			likesplay: {},
			likedplay: {},
			num_of_users: 0,
			pageviews: {},
			comments: [],
			num_of_comments: 0
		};
		this.updateStats.bind(this);

		if (typeof window !== 'undefined') {
			auth.signInAnonymously().catch((error) => {
				// Handle Errors here.
				// let errorCode = error.code;
				// let errorMessage = error.message;
			});
			if (auth && auth.currentUser && auth.currentUser.uid) {
				this.updateStats();
			}

			auth.onAuthStateChanged(user => {

				if (auth.currentUser.uid) {
					this.setState({user: auth.currentUser.uid});
					this.updateStats();
				}
				else {
					// User is signed out.
					// ...
				}
			});

		}

	}

	render(state) {
		//
		// let rank = parseInt(state.user.score/1000);
		let user = this.state.user || {};
		let games = this.state.games || {};
		// let likes = this.state.likesplay || {};
		let liked = this.state.likedplay || {};
		let pageviews = this.state.pageviews || {};
		let comments = [];
		let goodFields = ['times_played', 'average_rating', 'review_points'];
		this.state.comments.forEach((item) => {
			comments.push(<div class={style.comments}>{item[1].comment} <span class={style.dates}>({item[1].date})</span> </div>);
		 });


		return (
			<div class="home">
				<div class="smaller">Stats
					<p />
					<div class={style.report}>
						Total Users: {this.state.num_of_users}<br />
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
						Total Comments: {this.state.num_of_comments} <br />
						Last 10 Comments: {
							<div className="smallerBold">
								{comments}
							</div>
						}
					</div>
				</div>
			</div>
		);
	}
}
