import { Component } from 'preact';
import { auth, database } from '../../firebase';

import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';

import games_list from '../../games_list';

import style from './style';

function dynamicSort(property) {
	let sortOrder = 1;
	if (property[0] === '-') {
		sortOrder = -1;
		property = property.substr(1);
	}
	return function (a, b) {
		/* next line works with strings and numbers,
		 * and you may want to customize it to your needs
		 */
		let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
		return result * sortOrder;
	};
}

export default class Leaderboard extends Component {

	constructor() {
		super();
		this.state = {};

		const query = database.ref('games')
			.orderByChild('times_played')
			.limitToLast(6);

		query.once('value', (snapshot) => {
			snapshot.forEach((childSnapshot) => {

				let childKey = childSnapshot.key;
				let childData = childSnapshot.val();

				// Crazy new syntax for computed property names []

				this.setState({[childKey] : childData});
			});
		});

	}

	//gets called just before navigating away from the route
	componentWillUnmount()  {
	}

	getPopular(){
		let games = this.state;
		let res = "";

		for (var prop in games) {
			res +=  <div> {prop} </div>;
		}

		return res;
	}

	//Note: `user` comes from the URL, courtesy of our router
	render() {

		return (
			<div class={style.newpage}>
				<Card>
					<div class={style.cardBody}>
						<div class={style.mylabel}>Leaderboard:</div>
						<div class="mdc-typography--caption">The current top rankings are as follows:</div>
						<p>
							{this.getPopular()}

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
							<br />
						</p>
					</div>
				</Card>
			</div>);
	}
}