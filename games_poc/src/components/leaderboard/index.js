import { h, Component } from 'preact';
import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import style from './style';

export default class Leaderboard extends Component {
	state = {
	};

	//gets called when this route is navigated to
	componentDidMount() {
		//start a timer for the clock:
	}

	//gets called just before navigating away from the route
	componentWillUnmount() {
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
							<div class={style.person}>Aly L</div>:<div class={style.score}>1200</div><br />
							<div class={style.person}>Tim S</div>:<div class={style.score}>1000</div><br />
							<div class={style.person}>Joe B</div>:<div class={style.score}>780</div><br />
							<div class={style.person}>Sue T</div>:<div class={style.score}>640</div><br />
							<div class={style.person}>Ann F</div>:<div class={style.score}>520</div><br />
							<div class={style.person}>Jan C</div>:<div class={style.score}>480</div><br />
							<div class={style.person}>Ken L</div>:<div class={style.score}>450</div><br />
							<div class={style.person}>Zoe P</div>:<div class={style.score}>200</div><br />
						</p>
					</div>
				</Card>
			</div>);
	}
}