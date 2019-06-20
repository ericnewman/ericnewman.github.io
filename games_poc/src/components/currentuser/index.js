import { h, Component } from 'preact';
import { auth } from '../../firebase';
import style from './style';
import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import Button from 'preact-material-components/Button';

export default class CurrentUser extends Component {
	constructor() {
		super();
		this.state = {
	        currentUser: null
	    };
	}

	render() {
		const user = this.props.user;

		return (
			<div class={style.newpage}>
				<Card>
					<article class={style.currentUser}>
						<div class={style.userLabel}>Current Player:</div>
						<img
							alt={user.displayName}
							class={style.avatar}
							src={user.photoURL}
							width="40"
						/>
						<div>{user.displayName}</div>
						<Button  onClick={() => auth.signOut()}>
                        Sign Out
						</Button>
					</article>
				</Card>
			</div>
		);
	}
}
