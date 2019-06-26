import { Component } from 'preact';
import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import Button from 'preact-material-components/Button';
import { auth, googleAuthProvider } from '../../firebase';
import style from './style';


export default class SignIn extends Component {

	render() {
		return (
			<div class={`${style.home} page`}>
				<Card>
					<div className=" mdc-typography--title">Sign In to Firebase</div>
					<div class={style.cardBody}>
						<div class={style.signIn}>
							<Button
								raised ripple
								onClick={() => auth.signInWithRedirect(googleAuthProvider)}
							>
                                Sign In
				            </Button>
			            </div>
					</div>
				</Card>
			</div>
		);
	}
}
