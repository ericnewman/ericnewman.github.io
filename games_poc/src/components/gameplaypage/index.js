import { Component } from 'preact';
import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import Pframe from '../../components/pframe';
import PFooter from '../../components/pfooter';
import Snooze from '../../components/snooze';
import Notifications from 'react-notify-toast';

import style from './style';


export default class GamePlayPage extends Component {

	constructor() {
		super();
		this.state = {
			snooze: false
		};

		this.startSnooze = this.startSnooze.bind(this);
	}

	startSnooze() {
		console.log(this);
		this.state.snooze = !this.state.snooze;
		this.setState(this.state);
	}


	componentDidMount() {
		let s = JSON.parse(localStorage.getItem('savedFavorite'));

		if (s && s.favoriteGameIndex !== -1) {
			this.setState(s);
		}
	}

	render() {

		return (<div >
				{this.state.snooze && <Snooze/>}
				{!this.state.snooze && <Pframe src={this.state.favoritegameURL}
											   width="100%"
											   height="450px"
											   name="gameFrame"
											   id="gameFrame"
											   className={style.framey}
											   display="initial"
											   position="relative"
				/>}
				<PFooter name={this.state.favoriteGameName} snoozer={this.startSnooze}  />
				<Notifications options={{ zIndex: 200, top: '180px' }}/>
			</div>
		)
			;
	}
}
