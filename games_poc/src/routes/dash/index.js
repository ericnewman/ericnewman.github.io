import { h, Component } from 'preact';
import AFrame from '../../components/aframe';
import 'preact-material-components/Card/style.css';
import style from './style';

export default class Dash extends Component {
	render({ selectedGame }) {
		return (
			<div class={`${style.home} page`}>
				<AFrame selectedGame={selectedGame} />
			</div>
		);
	}
}
