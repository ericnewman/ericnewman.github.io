import { h, Component } from 'preact';
import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import style from './style';

export default class PasswordForgot extends Component {

	render() {
		return (
			<div class={style.forgot}>
				<h2 class=" mdc-typography--title">Forgot Password</h2>
				<Card>
					<div class={style.cardHeader}>
						<div class="mdc-typography--caption">Sign in to Firebase</div>
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

