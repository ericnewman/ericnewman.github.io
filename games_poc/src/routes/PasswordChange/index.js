import { h, Component } from 'preact';
import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import style from './style';

export default class PasswordChange extends Component {

	render() {
		return (
			<div class={`${style.password} page`}>
				<h2 class=" mdc-typography--title">Password Change</h2>
				<Card>
					<div class={style.cardHeader}>
						<div class="mdc-typography--caption">Change Firebase Password</div>
					</div>
					<div class={style.cardBody}>
						Below expect to find form to register for Firebase.
					</div>
					<Card.Actions>
						<Card.ActionButton>OKAY</Card.ActionButton>
					</Card.Actions>
				</Card>
			</div>
		);
	}
}

