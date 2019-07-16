import { h, Component } from 'preact';
import Leaderboard from '../../components/leaderboard';
import 'preact-material-components/Card/style.css';
import style from './style';
import TopPlayers from "../../components/topplayers";
import Button from "preact-material-components/Button";
import {route} from "preact-router";



const Play = (props) => {

	return (

		<div class={style.butn}>
			<Button
				raised ripple
				onClick={() => route('/dash')}
			>
				Play Again
			</Button>
		</div>
	);
}

export default class Boards extends Component {


	render() {

		return (
			<div className={`${style.home} page`}>
				<div className={style.main}>
				<Leaderboard />
				<TopPlayers />
				<div class={style.footer}>
					<Play />
				</div>
				</div>
			</div>
		);
	}
}
