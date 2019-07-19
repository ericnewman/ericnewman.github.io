import { Component } from 'preact';
import { database } from '../../firebase';

import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';

import style from './style';

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
			.orderByChild('total_achievements')
			.limitToLast(5);


		query2.on('value', (snapshot) => {
			this.tempP = [];
			snapshot.forEach((childSnapshot) => {

				//let childKey = childSnapshot.key;
				let childData = childSnapshot.val();
				this.tempP.push(childData);
				this.tempP.sort((a, b) =>
					 b.total_achievements - a.total_achievements  //this will sort according to .id descending
				);
			});
			this.setState({ games: this.tempG, people: this.tempP });

		});
	}

	//Note: `user` comes from the URL, courtesy of our router
	render() {
		let games = Object.entries(this.state.games);

		return (
			<div class={style.newpage}>
				<Card>
					<div class="caption">Leaderboard:</div>
					<div className="grid">
						<div className={style.ranks}>The current top 5 played games:</div>
						{
							games.reverse().map((name, index) => (
								name[1].times_played > 0 &&
								<div>
									<span class={style.game}>{name[1].name}</span>
									<span className="scoreBox">{name[1].times_played}</span>
								</div>
							)
							)
						}
					</div>
				</Card>
			</div>);
	}
}