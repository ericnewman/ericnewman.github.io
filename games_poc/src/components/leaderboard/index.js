import { Component } from 'preact';
import { database } from '../../firebase';

import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';

import style from './style';
import WebFont from 'webfontloader';

WebFont.load({
	google: {
		families: ['Orbitron:300,400,700', 'sans-serif']
	}
});

export default class Leaderboard extends Component {

	constructor() {
		super();
		this.state = {
			games: {},
			people: []
		};
		this.tempG = {};
		this.tempP = [];
	}
	componentDidMount() {
		const query = database.ref('games')
			.orderByChild('times_played')
			.limitToLast(5);

		query.on('value', (snapshot) => {
			this.tempG = {};
			snapshot.forEach((childSnapshot) => {

				let childKey = childSnapshot.key;
				let childData = childSnapshot.val();

				// Crazy new syntax for computed property names []

				this.tempG[childKey] = childData;
			});
			this.setState({ games: this.tempG, people: this.tempP });

		});
		const query2 = database.ref('users')
			.limitToLast(5);


		query2.on('value', (snapshot) => {
			this.tempP = [];
			snapshot.forEach((childSnapshot) => {

				//let childKey = childSnapshot.key;
				let childData = childSnapshot.val();
				this.tempP.push(childData);
			});
			this.setState({ games: this.tempG, people: this.tempP });

		});

	}

	//Note: `user` comes from the URL, courtesy of our router
	render() {
		let games = Object.entries(this.state.games);
		let people = this.state.people;

		return (
			<div class={style.newpage}>
				<Card>
					<div class={style.cardBody}>
						<div class={style.mylabel}>Leaderboard:</div>
						<div class={style.grid}>
							<div className={style.ranks}>The current top 5 played games:</div>
							{
								games.reverse().map((name, index) => (
									name[1].times_played > 0 &&
									<div>
										<span class={style.game}>{name[1].name}</span>
										<span class={style.score}>{name[1].times_played}</span>
									</div>
								)
								)
							}
						</div>
						<div className={style.grid}>
							<div className={style.ranks}>The current top players are as follows:</div>
							<div>
								{
									people.reverse().map((name, index) => (
									name.email != "" &&
									<div>
										<span className={style.player}>{name.username}</span>
										{name.achievements &&  name .achievements.green> 0 &&
										<span className={`${style.ach} ${style.green}`}>{name.achievements.green}</span>
										}
										{name.achievements && name.achievements.red > 0&&
											<span className={`${style.ach} ${style.red}`}>{name.achievements.red}</span>
										}
										{name.achievements &&  name .achievements.blue > 0 &&
											<span className={`${style.ach} ${style.blue}`}>{name.achievements.blue}</span>
										}

										{/*<span className={`${style.player} email`}>{name.email}</span>*/}
									</div>
									)
									)
								}
							</div>
						</div>
					</div>
				</Card>
			</div>);
	}
}