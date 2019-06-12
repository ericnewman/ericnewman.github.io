import { h, Component } from 'preact';
import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import style from './style';

import { auth, googleAuthProvider } from '../firebase';

export default class SignIn extends Component {
	render() {
		return (
			<div class={style.signIn}>
				<h1 class={style.h1}>Raisercise</h1>
				<button
					class={style.button}
					onClick={() => auth.signInWithRedirect(googleAuthProvider)}
				>
          Sign In
				</button>
			</div>
		);
	}
}
