import { Component } from 'preact';
import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import Button from 'preact-material-components/Button';
import style from './style';
import { auth, googleAuthProvider } from '../../firebase';


export default class PFooter extends Component {

	render(props) {

		return (
			<Card class={style.footer}>
				<div className={style.cardBody}>

					<div>Properties: Name: {props.name}</div>
				<Button
					raised ripple
					onClick={() => auth.signInWithRedirect(googleAuthProvider)}
				>
					Snooze
				</Button>
				<Button
					raised ripple
					onClick={() => auth.signInWithRedirect(googleAuthProvider)}
				>
					Choose Another
				</Button>
				</div>
			</Card>
		);
	}
}
