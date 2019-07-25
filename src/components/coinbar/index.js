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

	return (

		<div class={`${style.coin} ${stylex}`}>
			<div class={style.num}>{props.progress}
				{props.percent && '%'}
			</div>
		</div>
	);
};

export default class CoinBar extends Component {

	recalcColors() {
		let val = this.props.progress;
		console.log(this.props);
		if (val > 80) {
			// this.props.color = '#0F0';
			this.props.metal = 'gold';

		}
		else if (val > 40) {
			// this.props.color = '#FC0';
			this.props.metal = 'silver';

		}
		else if (val > 30) {
			// this.props.color = '#F00';
			this.props.metal = 'brass';

		}
		else if (val > 0) {
			// this.props.color = '#800';
			this.props.metal = 'brass';

		}
	}


	onChange = (ctx, val) => {

	};
	onComplete = ctx => {
	};


	constructor(props) {
		super(props);

		this.onChange.bind(this);
		this.onComplete.bind(this);

		this.recalcColors();
	}


	componentWillMount() {
		// stop when not renderable
		this.setState(this.props);

	}

	componentDidMount() {

	}

	componentWillUnmount() {
		// stop when not renderable
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
				<Coin metal={props.metal} progress={props.progress} percent={props.percent} />
			</div>
		);
	}
}
