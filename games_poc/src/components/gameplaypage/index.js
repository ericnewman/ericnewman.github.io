import { Component } from 'preact';
import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import Pframe  from '../../components/pframe';
import PFooter  from '../../components/pfooter';
import Notifications from 'react-notify-toast';

import style from './style';


export default class GamePlayPage extends Component {

	componentDidMount() {
		let s = JSON.parse(localStorage.getItem('savedFavorite'));
		if (s && s.favoriteGameIndex !== -1) {
			this.setState(s);
		}
	}

	render() {
		console.log(this.state);

		return (
			<div>
				<Pframe src={this.state.favoritegameURL}
					width="100%"
					height="450px"
					name="gameFrame"
					id="gameFrame"
					className={style.framey}
					display="initial"
					position="relative"
				/>
				<PFooter hovering="false" clicked="false" />
				<Notifications options={{ zIndex: 200, top: '180px' }} />
			</div>
		);
	}
}
