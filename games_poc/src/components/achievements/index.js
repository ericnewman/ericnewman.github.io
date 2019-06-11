import { h, Component } from 'preact';
import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import style from './style';
import Button from 'preact-material-components/Button';

export default class Achievements extends Component {
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
	render({ user }, { time, count }) {
		return (
		<div class={style.newpage}>
			<Card>
				<div class={style.cardBody}>
				    <div class={style.mylabel}>Achievements:</div>
                    <div class="mdc-typography--caption">The follow list of achievements were found for this user:</div>
                    <p>
					<p />
				</p>
				</div>
			</Card>
		</div>);
	}
}