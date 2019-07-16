import { h, Component } from 'preact';
import 'preact-material-components/Card/style.css';
import Button from 'preact-material-components/Button';
import style from './style';
import { route } from 'preact-router';

export default class Dark extends Component {

	goHome() {
		route('/');
	}

	render() {

		setTimeout(() => {
			route('/');
		}, this.props.delay);


		return (
			<div class={`${style.home}`}>
				<div class={style.hint}>
					<Button onClick={() => this.goHome()} >
						FSD
					</Button>
				</div>
			</div>
		);
	}
}