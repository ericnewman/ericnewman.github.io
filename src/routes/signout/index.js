import { Component } from 'preact';
import Button from 'preact-material-components/Button';
import { auth } from '../../firebase';
import Card from 'preact-material-components/Card';

import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import style from './style';

export default class SignOut extends Component {

	render() {
		return (
			<div class={`${style.signout} page`}>
				<h2 class="mdc-typography--title">Sign Out</h2>
				<Card>
					<div class={style.cardHeader}>
						<div class="mdc-typography--caption">Sign Out of Firebase</div>
					</div>
					<div class={style.cardBody}>
						Click below expect to end Firebase session.
					</div>
					<Card.Actions>
						<Button  onClick={() => auth.signOut()}>
                        Sign Out
						</Button>
					</Card.Actions>
				</Card>
			</div>
		);
	}
}

