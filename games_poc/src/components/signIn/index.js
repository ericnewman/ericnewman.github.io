import { h, Component } from 'preact';
import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import style from './style';
import Button from 'preact-material-components/Button';
import { auth, googleAuthProvider } from '../../firebase';


export default class SignIn extends Component {
    constructor () {
    		super();
    }

	render() {
		return (
			<div class={`${style.home} page`}>
				<h2 class=" mdc-typography--title">Sign In to Firebase</h2>
				<Card>
					<div class={style.cardHeader}>
						<div class="mdc-typography--caption">Firebase!</div>
					</div>
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
