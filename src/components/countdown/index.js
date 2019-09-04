import { Component } from 'preact';
import Progress from 'preact-progress';
import style from './style';
import ReactGA from 'react-ga';

export default class Countdown extends Component {

	onChange = (ctx, val) => {

		switch (val) {
			case 100:
			case 99:
				this.props.message = 'Start the game before it\'s too late!!!';
				this.props.color = '#0F0';
				if (this.props.changeBonus) {
					this.props.changeBonus(1);
				}
				break;
			case 95:
				this.props.color = '#0B0';
				break;
			case 45:
				this.props.color = '#FC0';
				this.props.message = 'Time\'s almost up!';
				if (this.props.changeBonus) {
					this.props.changeBonus(2);
				}
				break;
			case 20:
				this.props.color = '#F00';
				if (this.props.changeBonus) {
					this.props.changeBonus(3);
				}
				break;
			case 1:
			case 0:
				this.props.message = 'No fast-play bonus.';
				if (this.props.changeBonus) {
					this.props.changeBonus(3);
				}
				break;
		}

	};

	onComplete = ctx => {
		if (this.timer) {
			clearInterval(this.timer);
			if (this.props.afterAction) {
				this.props.afterAction();
			}
			this.timer= null;
			this.setState({ complete: true });
		}
	};
	screenUnlocked() {
		//console.log('It\'s unlocked!');
		window.unlocked = true;
		ReactGA.event({
			category: 'Screen Unlocked',
			action: 'Screen Unlocked',
			nonInteraction: false
		});

	}

	constructor(props) {
		super(props);

		this.state = {
			progress: 1,
			complete: false,
			showIntro: true


		};
		this.showCountdown = false;

		this.onChange.bind(this);
		this.onComplete.bind(this);
		if (typeof window !== 'undefined') {
			window.unlocked = false;
			window.screenUnlock = this.screenUnlocked;
		}
	}

	componentDidMount() {

		if (typeof window !== 'undefined') {
			let fasts = localStorage.getItem('fastStarts') || ',';
			let showCountdown = !fasts.includes(',' + this.props.game + ',');
			this.setState({
				showCountdown
			});


			if (window.MP && (window.MP.setScreenUnLockCallBack !== undefined)) {
				window.MP.setScreenUnLockCallBack('window.screenUnlock()');
			}
			else {
				window.unlocked = true;
			}
			if (showCountdown) {
				this.timer = setInterval(() => {
					if (window.unlocked) {
						this.setState({
							progress: (this.state.progress + 1) % 100
						});
					}
				}, 100); //100

			}
		}
	}

	componentWillUnmount() {
		// stop when not renderable
		clearInterval(this.timer);
		clearInterval(this.introTimer);
	}
	render(props, state) {
		return (
			<div>
				{/*{state.showCountdown && state.showIntro && <div className={style.intro}>*/}
				{/*	{props.intro}*/}
				{/*	</div>*/}
				{/*}*/}

				{state.showCountdown && !state.complete &&
				<div class={style.loader}>
					<div class={style.warn}>
						{props.message}
					</div>

					<Progress
						id="loader" class={style.loader}
						value={100 - this.state.progress} height="30px" color={props.color}
						onChange={this.onChange}
						onComplete={this.onComplete}
					/>
				</div>}
			</div>
		);
	}
}
