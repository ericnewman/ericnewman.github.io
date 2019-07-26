import { Component } from 'preact';
import { database } from '../../firebase';

import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';

import style from './style';

export default class TopPlayers extends Component {

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
		// let games = Object.entries(this.state.games);
		let people = this.state.people;

		return (
			<div class={style.newpage}>
				<Card>
					<div class="caption">Top Players:</div>
					<div class={style.cardBody}>
						<div class="grid">
							<div class={style.ranks}>The current top players are as follows:</div>
							<div>
								{

									people.map((name, index) => (
										name.email !== '' &&
									<div>
										<span class={style.player}>{name.username}</span>
										<span class={`${style.ach} ${style.green}`}>
											{name.achievements && name.achievements.green > 0 && <span>{name.achievements.green}</span>}
										</span>
										<span class={`${style.ach} ${style.red}`}>
											{name.achievements && name.achievements.red > 0 && <span>{name.achievements.red}</span>}
										</span>
										<span class={`${style.ach} ${style.blue}`}>
											{name.achievements && name.achievements.blue > 0 && <span>{name.achievements.blue}</span>}
										</span>
										<span class={`${style.ach} ${style.silver}`}>
											{name.achievements && name.achievements.silver > 0 && <span>{name.achievements.silver}</span>}
										</span>
										<span class={`${style.ach} ${style.gold}`}>
											{name.achievements && name.achievements.gold > 0 && <span>{name.achievements.gold}</span>}
										</span>
										<span class={`${style.ach} ${style.magic}`}>
											{name.achievements && name.achievements.magic > 0 && <span>{name.achievements.magic}</span>}
										</span>
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