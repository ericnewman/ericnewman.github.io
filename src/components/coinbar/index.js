import { Component } from 'preact';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import Progress from 'preact-progress';
import style from './style';


const Coin = (props) => {
	let stylex = '';

	switch (props.metal) {
		case 'brass':
			stylex = style.brass;
			break;
		case 'silver':
			stylex = style.silver;
			break;
		case 'gold':
			stylex = style.gold;
			break;
	}
	if (!props.earned) {
		stylex += (' ' + style.unearned);
	}

	return (

		<div class={`${style.coin} ${stylex}`}>
			<div class={style.num}>{props.progress}</div>
		</div>
	);
};

export default class CoinBar extends Component {

	recalcColors() {
		let val = this.props.progress;

		if (val > 80) {
			this.props.color = '#0F0';
			this.props.earnedBrass = true;
			this.props.earnedSilver = true;
			this.props.earnedGold = true;

		}
		else if (val > 40) {
			this.props.color = '#FC0';
			this.props.earnedBrass = true;
			this.props.earnedSilver = true;
			this.props.earnedGold = false;
		}
		else if (val > 30) {
			this.props.color = '#F00';
			this.props.earnedBrass = true;
			this.props.earnedSilver = false;
			this.props.earnedGold = false;
		}
		else if (val > 0) {
			this.props.color = '#800';
			this.props.earnedBrass = false;
			this.props.earnedSilver = false;
			this.props.earnedGold = false;
		}
	}

	randomize() {
		let r = Math.floor(Math.random() * Math.floor(100));
		this.props.progress = r;
		this.props.brassPts = r % 30;
		this.props.silverPts = r % 60;
		this.props.goldPts = r % 90;
		this.recalcColors();

		this.setState(this.props);

	}

	onChange = (ctx, val) => {

	};
	onComplete = ctx => {
	};


	constructor(props) {
		super(props);

		this.onChange.bind(this);
		this.onComplete.bind(this);
	}


	componentWillMount() {
		// stop when not renderable

		if (this.props.randomize) {
			this.timer = setInterval(() => {
				this.randomize();
			}, 800);
		}
	}

	componentDidMount() {

	}

	componentWillUnmount() {
		// stop when not renderable
		if (this.timer) {
			clearInterval(this.timer);
			this.timer = null;
		}
	}


	render(props, state) {
		return (
			<div class={style.bar}>
				<Progress
					className={style.loader}
					value={state.progress} height="32px" color={props.color}
					onChange={this.onChange}
					onComplete={this.onComplete}
				/>
				<div className={style.title}>
					{props.title}
				</div>
				<Coin metal="brass" earned={props.earnedBrass} progress={props.brassPts} />
				<Coin metal="silver" earned={props.earnedSilver} progress={props.silverPts} />
				<Coin metal="gold" earned={props.earnedGold} progress={props.goldPts} />
			</div>
		);
	}
}
