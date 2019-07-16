import { Component } from 'preact';
import Pframe from '../../components/pframe';
import PFooter from '../../components/pfooter';
import Snooze from '../../components/snooze';
import Notifications from 'react-notify-toast';
import { route } from 'preact-router';

import style from './style';


export default class GamePlayPage extends Component {


	startSnooze() {
		this.state.snooze = !this.state.snooze;
		this.state.leaderboard = false;
		this.setState(this.state);
	}

	startLeaderboard() {
		this.state.leaderboard = !this.state.leaderboard;
		this.state.snooze = false;
		this.setState(this.state);
		route('boards');
	}


	constructor(props) {
		super(props);
		this.state = {
			snooze: false,
			leaderboard: false
		};

		this.startSnooze = this.startSnooze.bind(this);
		this.startLeaderboard = this.startLeaderboard.bind(this);
	}

	componentWillMount() {
		let s = JSON.parse(localStorage.getItem('savedFavorite'));

		if (s && s.favoriteGameIndex !== -1) {
			this.setState(s);
		}
	}

	render(props, state) {
		const kTopBarHeight = 64;
		const kFooterBarHeight = 100;
		let hgt = (window.innerHeight - kTopBarHeight - kFooterBarHeight - 20);

		return (<div >
			{this.state.snooze && <Snooze />}
			{!this.state.snooze && !this.state.leaderboard && <Pframe src={this.state.favoriteGameURL}
				width="100%"
				height={hgt}
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
