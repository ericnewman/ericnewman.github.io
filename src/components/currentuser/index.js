import { h,Component } from 'preact';
import { auth } from '../../firebase';
import style from './style';
import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import Button from 'preact-material-components/Button';

export default class CurrentUser extends Component {
	constructor(currentUser) {
		super();
		this.state = {
			currentUser: currentUser
		};
	}

	render() {
		const user = this.props.user;

		return (
			<div class={style.newpage}>
				<Card>npm insta;;
					<article class={style.currentUser}>
						<div class={style.userLabel}>Player</div>
						<img
							alt={user.displayName}
							class={style.avatar}
							src={user.photoURL}
							width="40"
						/>
						<div class={style.userLabel}>{user.displayName}</div>
						<Button raised onClick={() => auth.signOut()}>
							Sign Out
						</Button>
					</article>
				</Card>
			</div>
		);
	}
}
