import { Component } from 'preact';
import { database } from '../../firebase';

import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';

import games_list from '../../games_list';

import style from './style';

export default class Leaderboard extends Component {

	constructor() {
		super();
		this.state = {};
		games_list.map((game) => {
			console.log(game);
			database.ref('leaderboard/' + game.name.replace(/[,@).]/gi, '_')).update({
				game_name: game.name,
				number_of_times_played: 0,
				thumbnail: game.image,
				url: game.url,
				top_player:""
			});
		});

	}


	//gets called just before navigating away from the route
	componentWillUnmount()  {
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