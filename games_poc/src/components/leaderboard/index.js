import { Component } from 'preact';
import { auth, database } from '../../firebase';

import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';

import style from './style';


export default class Leaderboard extends Component {

	constructor() {
		super();
		this.state = {};
		this.users = {};

		const query = database.ref('games')
			.orderByChild('times_played')
			.limitToLast(5);

		query.once('value', (snapshot) => {
			snapshot.forEach((childSnapshot) => {

				let childKey = childSnapshot.key;
				let childData = childSnapshot.val();

				// Crazy new syntax for computed property names []

				this.setState({ [childKey]: childData });
			});
		});
		const query2 = database.ref('users')
			.limitToLast(5);

		query2.once('value', (snapshot) => {
			snapshot.forEach((childSnapshot) => {

				let childKey = childSnapshot.key;
				let childData = childSnapshot.val();
				console.log(childData);
			});
		});

	}

	//Note: `user` comes from the URL, courtesy of our router
	render() {
		let games = Object.entries(this.state);

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
										<span class={style.gamen}>{name}</span>
										<span class={style.tplay}>{name[1].times_played}</span>
									</div>
									)
								)
							}
						</div>
						<div className={style.grid}>
						<div className={style.ranks}>The current top rankings are as follows:</div>
						<div class={style.person}>Aly L</div>
					:
						<div class={style.score}>1200</div>
						<br />
						<div class={style.person}>Tim S</div>
					:
						<div class={style.score}>1000</div>
						<br />
						<div class={style.person}>Joe B</div>
					:
						<div class={style.score}>780</div>
						<br />
						<div class={style.person}>Sue T</div>
					:
						<div class={style.score}>640</div>
						<br />
						<div class={style.person}>Ann F</div>
					:
						<div class={style.score}>520</div>
						<br />
						<div class={style.person}>Jan C</div>
					:
						<div class={style.score}>480</div>
						<br />
						<div class={style.person}>Ken L</div>
					:
						<div class={style.score}>450</div>
						<br />
						<div class={style.person}>Zoe P</div>
					:
						<div class={style.score}>200</div>
						</div>
					</div>
				</Card>
			</div>);
	}
}