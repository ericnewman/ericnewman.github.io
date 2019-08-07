import { Component } from 'preact';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import Progress from 'preact-progress';
import style from './style';

export default class ScoreBar extends Component {

	// Don't delete these methods!
	onChange() {

	}
	onComplete() {

	}
	render(props, state) {
		if (!props.maxValue) {
			props.maxValue = 100;
		}
		let val = props.progress;

		if (!props.title) {
			props.title = props.progress + ' points';
		}

		return (
			<div class={style.bar}>
				<Progress
					class={style.loader}
					value={val} height="32px" color={props.color}
					onChange={this.onChange}
					onComplete={this.onComplete}
				/>
				{!props.noscore && <div class={style.title}>
					{props.title}
				</div>}
			</div>
		);
	}
}
