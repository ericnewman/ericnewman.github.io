import { h, Component } from 'preact';
import GamePlayPage from '../../components/gameplaypage';
import 'preact-material-components/Card/style.css';
import style from './style';

export default class Dash extends Component {


	render() {

		return (
			<div class={`${style.home} page`}>
				<GamePlayPage />
			</div>
		);
	}
}
