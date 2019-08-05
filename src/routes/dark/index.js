import { h, Component } from 'preact';
import 'preact-material-components/Card/style.css';
import Button from 'preact-material-components/Button';
import { route } from 'preact-router';
import style from './style';

export default class Dark extends Component {

	goHome() {
		let url =
			route('/dash/' + localStorage.getItem('currentGameID') || '1');
	}

	render(props) {
		console.log(this.props);

		return (
			<div class={style.dark}>
				<div class={style.hint}>
					<Button class={style.darkbutton} onClick={() => this.goHome()} >
						FSD
					</Button>
				</div>
			</div>
		);
	}
}
