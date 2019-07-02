import { Component } from 'preact';
import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import Pframe from '../../components/pframe';
import PFooter from '../../components/pfooter';
import Snooze from '../../components/snooze';
import Leaderboard from '../../components/leaderboard';
import Notifications from 'react-notify-toast';

import style from './style';


export default class GamePlayPage extends Component {

	constructor() {
		super();
		this.state = {
			snooze: false,
			leaderboard: false
		};

		this.startSnooze = this.startSnooze.bind(this);
		this.startLeaderboard = this.startLeaderboard.bind(this);
	}

	startSnooze() {
		this.state.snooze = !this.state.snooze;
		this.state.leaderboard = false;
		this.setState(this.state);
	}

	startLeaderboard() {
		this.state.leaderboard = !this.state.leaderboard;
		this.state.snooze = false;
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
				{this.state.snooze && <Snooze />}
				{this.state.leaderboard && <Leaderboard />}
			{!this.state.snooze && !this.state.leaderboard && <Pframe src={this.state.favoritegameURL}
				width="100%"
				height="450px"
				name="gameFrame"
				id="gameFrame"
				className={style.framey}
				display="initial"
				position="relative"
			                       />}
			<PFooter name={this.state.favoriteGameName} snoozer={this.startSnooze} leaderboard={this.startLeaderboard} />
			<Notifications options={{ zIndex: 200, top: '180px' }} />
		</div>
		)
		;
	}
}
