import { h, Component } from 'preact';
import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import style from './style';

export default class Dark extends Component {

	render() {

		return (
			<div class={`${style.home} page`}>
				<Card>
					<div class={style.hint}>
						Looks like the page you are trying to access, doesn't exist.
					</div>
				</Card>
			</div>
		);
	}
}
