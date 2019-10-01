import { Component } from 'preact';
import { notify } from 'react-notify-toast';
import Button from 'preact-material-components/Button';

import ReactGA from 'react-ga';
import gamesList from '../../gamesList';

import style from './style.scss';

const  timeout = 2000;

export default class Footer extends Component {

	showToast(msg) {
		let d = document.getElementById('home');

		if (d !== null) {
			d.classList.add('dim');
		}
		let colors = { background: 'none', text: '#FFFFFF' };
		document.getElementById('toastBox').classList.add('orangeBox');

		setTimeout(() => {
			document.getElementById('toastBox').classList.remove('orangeBox');
		}, timeout + 200);

		notify.show(msg,
			'custom',
			timeout,
			colors);
	}

	waitAndNext() {
		setTimeout(() => {
			document.getElementById('home').classList.remove('dim');
		}, timeout+100);
	}

	vote(nextValue) {

		if (this.state.voted) {
			return;
		}
		this.setState({ voted: true });

		let name = gamesList[this.props.game_id].name;

		ReactGA.event({
			category: 'Ratings',
			action: 'User Rated ' + name + ':' + nextValue,
			value: nextValue
		});
		//
		// Remember that the user has rated this game, and prevent counting the bonus if they rate more than once.
		//
		if (typeof window !== 'undefined') {
			let prevRatings = localStorage.getItem('previouslyRated') || ',';
			if (!prevRatings.includes(',' + this.props.game_id + ',')) {
				localStorage.setItem('previouslyRated', prevRatings + this.props.game_id + ',');
			}
		}

		this.showToast('Thanks for Your Review.');
		this.waitAndNext();
	}

	constructor(props) {
		super(props);
		if (typeof window !== 'undefined') {

			let prevRatings = localStorage.getItem('previouslyRated') || ',';

			let alreadyVoted = prevRatings.includes(this.props.game_id);
			this.state = {
				voted: alreadyVoted
			};
		}
	}

	render(props, state) {
		let showRating = (props.elapsed > 14);
		let showMsgs = (props.elapsed < 60);

		return (
			<div class={style.footer}>
				{!props.started &&
				<div class={style.bots}>
					<div className={style.playsc}>{props.gameMsg}</div>
				</div>
				}
				{props.started && state.voted && showMsgs && <div>Thanks for rating...</div>}
				{props.started && !state.voted && !showRating && showMsgs && <div>Playing...</div>}
				{props.started && !state.voted && showRating &&
				<div class={style.bots} >
					<div class={style.rateIt}>Rate This<br />Game</div>
					<div class={style.buts}>
						<Button class={style.orangeButton} onClick={() => this.vote(1)} >
							MEH
						</Button>
						<Button class={style.orangeButton} onClick={() => this.vote(2)} >
							Like It
						</Button>
						<Button class={style.orangeButton} onClick={() => this.vote(3)} >
							Love It
						</Button>
					</div>
				</div>
				}

			</div>
		);
	}
}