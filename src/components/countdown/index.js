import {Component} from 'preact';
import Progress from 'preact-progress';
import style from './style.scss';
import ReactGA from 'react-ga';

export default class Countdown extends Component {


	onChange = (ctx, val) => {

		switch (val) {
			case 100:
			case 99:
				this.props.message = 'Start the game before it\'s too late!!!';
				//this.props.color = '#0F0';
				break;
			//case 95:
				//this.props.color = '#0B0';
				//break;
			case 45:
				//this.props.color = '#FC0';
				this.props.message = 'Time\'s almost up!';
				break;
			case 20:
				//this.props.color = '#F00';
				break;
			case 1:
			case 0:
				this.props.message = 'No fast-play bonus.';
				this.onComplete(this);
				break;
		}
	};

		onComplete = () => {
			this.setState({
				complete: true,
				progress: 1
			});


			if (this.timer) {
				clearInterval(this.timer);
				this.timer = null;
				if (this.props.afterAction) {
					this.props.afterAction();
				}
			}
		};


	screenUnlocked = () => {
		window.unlocked = true;
		ReactGA.event({
			category: 'Screen Unlocked',
			action: 'Screen Unlocked',
			nonInteraction: false
		});
	};

	constructor(props) {
		super(props);

		let fasts = ',';
		let optedIn = false;

		if (typeof window !== 'undefined') {
			fasts = localStorage.getItem('fastStarts') || ',';
		}

		let showCountdown = !fasts.includes(',' + this.props.game + ',') || !optedIn;

		this.state = {
			progress: 1,
			complete: false,
			countedDown: false,
			showCountdown
		};
		this.props.color = '#45196F';

		this.onChange.bind(this);
		this.onComplete.bind(this);

		if (typeof window !== 'undefined') {
			window.unlocked = false;
			window.screenUnlock = this.screenUnlocked;
		}
	}

	componentDidMount() {

		if (typeof window !== 'undefined') {

			if (window.MP && (window.MP.setScreenUnLockCallBack !== undefined)) {
				window.MP.setScreenUnLockCallBack('window.screenUnlock()');
			}
			else {
				window.unlocked = true;
			}
			if (this.state.showCountdown) {
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
	}

	render(props, state) {

		if (props.gamestarted) {
			this.onComplete();
		}
		return (
			<div>
				{state.showCountdown && !state.complete &&
					<div className={style.loader}>
						<div className={style.warn}>
							{props.message}
						</div>

						<Progress id="loader"
							class={style.loader}
							value={100 - this.state.progress}
							height="30px"
							color={props.color}
							onChange={this.onChange}
							onComplete={this.onComplete}
						/>
					</div>
				}
			</div>
		);

	}
}