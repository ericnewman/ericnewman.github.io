import { Component } from 'preact';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import Progress from 'preact-progress';
import style from './style';

export default class CountDown extends Component {

	onChange = (ctx, val) => {

		switch (val) {
			case 100:
			case 99:
				this.props.message = 'Start the game before it\'s too late!!!';
				this.props.color = '#0F0';
				if(this.props.changeBonus) {
					this.props.changeBonus(1);
				}
				break;
			case 95:
				this.props.color = '#0B0';
				break;
			case 45:
				this.props.color = '#FC0';
				this.props.message = 'Time\'s almost up!';
				if(this.props.changeBonus) {
					this.props.changeBonus(2);
				}
				break;
			case 20:
				this.props.color = '#F00';
				if(this.props.changeBonus) {
					this.props.changeBonus(3);
				}
				break;
			case 1:
			case 0:
				this.props.message = 'No fast-play bonus.';
				if(this.props.changeBonus) {
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

		}
	};

	constructor(props) {
		super(props);

		this.state = {
			progress: 1
		};

		this.onChange.bind(this);
		this.onComplete.bind(this);
	}

	componentDidMount() {

		this.timer = setInterval(() => {
			this.setState({ progress: (this.state.progress + 1) % 100 });
		}, 100); //200
	}
	componentWillUnmount() {
		// stop when not renderable
		clearInterval(this.timer);
	}

	render(props) {
		return (
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
			</div>
		);
	}
}
