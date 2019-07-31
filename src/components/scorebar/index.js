import { Component } from 'preact';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import Progress from 'preact-progress';
import style from './style';



export default class ScoreBar extends Component {



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
		//this.setState(this.props);

	}

	componentDidMount() {

	}

	componentWillUnmount() {
		// stop when not renderable
	}


	render(props, state) {
		if(!props.maxValue) {
			props.maxValue = 100;
		}
		let val = props.progress;

		return (
			<div class={style.bar}>
				<Progress
					class={style.loader}
					value={val} height="32px" color={props.color}
					onChange={this.onChange}
					onComplete={this.onComplete}
				/>
				{!props.noscore && <div class={style.title}>
					{props.progress}
				</div>}
			</div>
		);
	}
}
