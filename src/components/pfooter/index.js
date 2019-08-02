import { Component } from 'preact';
import { route } from 'preact-router';
import { notify } from 'react-notify-toast';
import Button from 'preact-material-components/Button';
import ParticleEffectButton from 'react-particle-effect-button';
import ReactGA from 'react-ga';

import { auth, database } from '../../firebase';
import gamesList from '../../gamesList';
import { microBridge } from '../../micro_bridge'

import 'preact-material-components/Button/style.css';

import style from './style';

const  timeout = 2000;

const k_rating_bonus = 200;

export default class PFooter extends Component {

	state = {
		time: Date.now(),
		interval: 0,
		snoozing: false
	};
	//update the current time
	updateTime = () => {
		this.setState({ time: Date.now() });
	};

	doSnooze = (interval) => {
		if(!this.state.snoozing) {
			this.interval = interval;
			if(this.props.snoozer) {
				this.props.snoozer();

			}

			this.setState({snoozing: true})
			ReactGA.event({
				category: 'Snooze',
				action: 'User Snoozed for: ' + interval,
				value: interval
			});

			let ref = database.ref('users/' + auth.currentUser.uid + '/totalSnoozes');
			ref.transaction((totalSnooze) =>
				(totalSnooze || 0) + 1
			);
		}


		let colors = { background: 'none', text: '#FFFFFF' };
		document.getElementById('home').classList.add('dim');
		document.getElementById('toastBox').classList.add('snoozeBox');

		notify.show('See you soon! Be back in ' + this.interval + ' Minutes...',
			'custom',
			timeout,
			colors);

		microBridge.sendDelayedBanner(document.URL, interval);

		setTimeout(() => {
			if(document.getElementById('home')) {
				document.getElementById('home').classList.remove('dim');
			}
			document.getElementById('toastBox').classList.remove('snoozeBox');

			route('/dark/' + (interval*3600));
		}, timeout+500);


	};


	_onToggle = () => {
		if (this.props.preSnooze) {
			this.props.preSnooze();
		}
		if (this.state.animating) return;

		this.setState({
			hidden: !this.state.hidden,
			animating: true
		});
	}
	_onToggle2 = () => {
		if (this.props.preSnooze) {
			this.props.preSnooze();
		}

		if (this.state.animating2) return;

		this.setState({
			hidden2: !this.state.hidden2,
			animating2: true
		});
	}

	_onAnimationComplete = () => {
		this.setState({
			hidden: false,
			animating: false
		});
		this.doSnooze(5);
	}
	_onAnimationComplete2 = () => {
		this.setState({
			hidden2: false,
			animating2: false
		});
		this.doSnooze(30);
	}

	showToast(msg) {
		let d = document.getElementById('home');

		if(d != null) {
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
			this.setState({ voted: true });
		}, timeout+100);

	}
	close() {
		ReactGA.event({
			category: 'Navigate',
			action: 'User closed window',
			value: 0
		});

		microBridge.closeWindow();
	}

	medals() {
		route('/outcome');
	}

	more() {
		ReactGA.event({
			category: 'Navigate',
			action: 'User selected More Games',
			value: 0
		});

		document.location.href= 'https://games-metropcs.arkadiumarena.com/?arkpromo=metrozone_discover';
	}

	vote(nextValue) {

		if (this.state.voted) {
			return;
		}
		let name = gamesList[this.props.game_id].name;
		let pts =  0;

		ReactGA.event({
			category: 'Ratings',
			action: 'User Rated ' + name + ' ' + nextValue,
			value: nextValue
		});


		let ref = database.ref('games/' + name + '/review_points');
		ref.transaction(points  => {
			pts = ((points || 0) + nextValue);
			this.setState({
				review_points: pts
			});
			return pts;
		});

		ref = database.ref('games/'+ name + '/average_rating');
		ref.transaction(average  => {
				average =  Math.round((pts/this.state.times_played+1 || 0) * 100) / 100;

			this.setState({
				rating: average,
				voted: true
			});

			return average;
		}
		);
		ref = database.ref('users/' + auth.currentUser.uid + '/score');
		ref.transaction((totalScore) =>
			(totalScore || 0) + k_rating_bonus
		);

		this.showToast('Thanks for Your Review.  200 Points');
		this.waitAndNext();
	}

	constructor(props) {
		super(props);

		this.state = {
			voted: false
		};
	}

	componentWillMount() {
		let name = gamesList[this.props.game_id].name;
		let db = {};

		let ref = database.ref('games/' + name);
		ref.once('value', snapshot => {
			db = snapshot.val();
			this.setState(db);
		});
	}

	render(props, state) {
		const {
			background,
			text,
			buttonStyles,
			buttonOptions = {
				color: '#007CE2',
				duration: 200,
				easing: 'easeInOutQuad',
				speed: 0.15,
				particlesAmountCoefficient: 30,
				oscillationCoefficient: 100,
				direction: 'top',
				type: 'triangle'
			},
			buttonOptions2 = {
				color: '#073763',
				duration: 200,
				easing: 'easeOutQuad',
				speed: 0.2,
				particlesAmountCoefficient: 20,
				oscillationCoefficient: 100,
				direction: 'top',
				type: 'triangle'


			}
		} = this.props;

		const {
			hidden,
			animating,
			hidden2,
			animating2
		} = this.state;

		return (

			<div class={style.footer}>
				<div class={style.playsc}>{props.gameMsg}</div>
				{!props.showStars &&
				<div class={style.bots}>
					<div class={style.lefty}>SNOOZE:</div>
					<div class={style.buts}>
						<ParticleEffectButton
							hidden={hidden}
							onComplete={this._onAnimationComplete}
							{...buttonOptions}
						>
							<button
								style={{
									background: '#007CE2',
									color: '#fff',
									padding: '3px 15px',
									border: '0',
									borderRadius: 25,
									cursor: 'pointer',
									fontSize: '1.4em',
									flexGrow: 1
								}}
								onClick={this._onToggle}
							>
							5 min
							</button>
						</ParticleEffectButton>&nbsp;&nbsp;&nbsp;&nbsp;
						<ParticleEffectButton
							hidden={hidden2}
							onComplete={this._onAnimationComplete2}
							{...buttonOptions2}
						>
							<button
								style={{
									background: '#007CE2',
									color: '#fff',
									padding: '3px 15px',
									border: '0',
									borderRadius: 25,
									cursor: 'pointer',
									fontSize: '1.4em'
								}}
								onClick={this._onToggle2}
							>
							30 min
							</button>
						</ParticleEffectButton>
					</div>
				</div>
				}

				{props.showStars && !state.voted &&
					<div class={style.bots} >
						<div class={style.rateIt}>RATE IT</div>
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
						{/*<div class={style.tiny}>Running at an average rating of: {state.rating}</div>*/}
					</div>
				}

				{state.voted &&
				<div class={style.bots}>
					<span class={style.rateIt}>NEXT</span>
					<div class={style.buts}>
						<Button class={style.dkBlueButton} onClick={() => this.close()}>
							close
						</Button>
						<Button class={style.yellowButton} onClick={() => this.medals()}>
							medals
						</Button>
						<Button class={style.pinkButton} onClick={() => this.more()}>
							more games
						</Button>
					</div>
				</div>
				}
			</div>
		);
	}
}