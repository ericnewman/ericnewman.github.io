import { Component } from 'preact';
import style from './style';

export default class NotFound extends Component {
	render () {
		return (<div class={style.home}>
			<div>
				<div class={style.cardHeader}>
					<h2 class="mdc-typography--title">404! Page not found.</h2>
				</div>
				<div class={style.cardBody}>
						Looks like the page you are trying to access, doesn't exist.
				</div>
			</div>
		</div>);
	}
}
