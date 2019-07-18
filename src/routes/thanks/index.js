import { Component } from 'preact';
import Notifications from 'react-notify-toast';
import { route } from 'preact-router';

import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';

import Button from 'preact-material-components/Button';

import style from './style';

export default class Thanks extends Component {


	render() {

		return (
			<div class={`${style.home} page`}>
				<div>
					<div><p/></div>
					<div className={style.beta}>DRAFTCARDS</div>
					<div class={style.smaller}>Thanks for letting us know you're not a gamer...</div>
					<div><p/></div>
					<div class={style.beta}>We won't ask you to join our quest unless you change your mind later..</div>
					<div><p/></div>

					<div class={style.cent}>
						<Button raised ripple dense class={style.green}
								onClick={() => route('/step1')}
						>
							I Changed my Mind
						</Button>
					</div>
					<div className={style.cent}>
						<Button   outlined secondary
								onClick={() => document.location.href = 'http://google.com'}
						>
							Close
						</Button>
					</div>
				</div>
				<Notifications options={{ zIndex: 200, top: '180px' }}/>
			</div>
		);
	}
}
