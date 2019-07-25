import { Component } from 'preact';
import { route } from 'preact-router';
import Stars from 'react-star-rating-component';
import { notify } from 'react-notify-toast';
import Button from 'preact-material-components/Button';

import {  database } from '../../firebase';
import gamesList from '../../gamesList';
import ParticleEffectButton from 'react-particle-effect-button';

import style from './style';

const  timeout = 3500;


export default class PFooter extends Component {

	state = {
		time: Date.now(),
		interval: 0
	};
	//update the current time
	updateTime = () => {
		this.setState({ time: Date.now() });
	};

	doSnooze = (interval) => {
		this.interval = interval;
		let timeout=3000;

		let color = { background: '#58F', text: '#FFFFFF' };
		document.getElementById('home').classList.add('dim');

		notify.show('See you soon! Be back in ' + this.interval + ' Minutes...',
			'custom',
			timeout,
			color);

		setTimeout(() => {
			document.getElementById('home').classList.remove('dim');

			route('/dark/' + (interval*3600));
		}, timeout);
	};


	_onToggle = () => {
		if (this.state.animating) return;

		this.setState({
			hidden: !this.state.hidden,
			animating: true
		});
	}
	_onToggle2 = () => {
		if (this.state.animating2) return;

		this.setState({
			hidden2: !this.state.hidden2,
			animating2: true
		});
	}

	_onAnimationComplete = () => {
		this.setState({
			animating: false
		});
		this.doSnooze(5);
	}
	_onAnimationComplete2 = () => {
		this.setState({
			animating2: false
		});
		this.doSnooze(30);
	}

	showToast(msg) {
		let color = { background: '#F83', text: '#FFFFFF' };
		let timeout = timeout;
		document.getElementById('home').classList.add('dim');

		notify.show(msg,
			'custom',
			timeout,
			color);
	}


	waitAndGo(path) {
		setTimeout(() => {
			document.getElementById('home').classList.remove('dim');
			route(path);
		}, timeout/2);

	}

	onStarClick(nextValue) {

		if (this.state.voted) {
			return;
		}
		let name = gamesList[this.props.game_id].name;

		let ref = database.ref('games/' + name + '/review_points');

		ref.transaction(points  => ((points || 0) + nextValue));

		ref = database.ref('games/'+ name + '/rating');
		ref.transaction(average  => {
			average =  Math.round((this.state.review_points/this.state.times_played || 0) * 100) / 100;

			this.setState({
				rating: average,
				voted: true
			});
			return average;
		}
		);
		this.showToast('Thanks for your review - you will be rewarded!');
		this.waitAndGo('/outcome');
	}

	constructor(props) {
		super(props);

		this.state = {
			voted: false
		};
		this.onStarClick = this.onStarClick.bind(this);
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
				color: '#EF7D15',
				duration: 600,
				easing: 'easeOutQuad',
				speed: 0.2,
				particlesAmountCoefficient: 10,
				oscillationCoefficient: 80
			},
			buttonOptions2 = {
				color: '#073763',
				duration: 600,
				easing: 'easeOutQuad',
				speed: 0.2,
				particlesAmountCoefficient: 10,
				oscillationCoefficient: 80
			}
		} = this.props;

		const {
			hidden,
			animating,
			hidden2,
			animating2
		} = this.state;

		{/*<div className={style.cent}>*/}
		{/*	{!props.showStars && <div>*/}
		{/*		SNOOZE <Button*/}
		{/*			raised ripple*/}
		{/*			onClick={() => props.snoozer(5)}*/}
		{/*		>*/}
		{/*			5 min*/}
		{/*		</Button>*/}
		{/*		<Button*/}
		{/*			raised ripple*/}
		{/*			onClick={() => props.snoozer(30)}*/}
		{/*		>*/}
		{/*			30 min*/}
		{/*		</Button>*/}
		{/*		*/}
		{/*</div>*/}

		return (

			<div class={style.footer}>
				<div className={style.playsc}> Tap to Play now!</div>
				{!props.showStars &&
				<div className="bots">
					<span className={style.lefty}>SNOOZE:</span>
					<div className={style.buts}>
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
									fontSize: '1.4em'
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

				{props.showStars && <div className={style.bar}>

					<Stars
						name="rate1"
						starCount={5}
						value={props.rating}
						editing
						emptyStarColor={'#393'}
						starColor={'#933'}
						renderStarIcon={(index, value) => {
							if (index === value) {
								return (
									<span className={`${style.vote} ${style.YES}`}>{index}</span>
								);
							}

							return (
								<span className={`${style.vote} ${style.NO}`}>{index}</span>
							);

						}
						}
						onStarClick={this.onStarClick.bind(this)}
					/>
					<div class={style.tiny}>Running at an average rating of: {state.rating}</div>
				</div>
				}

			</div>
		);
	}
}