import { Component } from 'preact';
import Notifications from 'react-notify-toast';
import { route } from 'preact-router';

import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';

import Button from 'preact-material-components/Button';

import style from './style';

export default class Quest extends Component {

	constructor(props) {
		super(props);

		this.state = {
			finished1 : false,
			finished2 : false

	}
	}


	render(props,state) {

		return (
			<div class={`${style.home} page`}>
				<div>
					<div><p/></div>
					<div className={style.beta}>DRAFTCARDS</div>
					<div class={style.smaller}>As a gamer, we're looking forward to having you join our quest as we explore the exciting new world of "Frictionless Gaming".</div>
					<div><p/></div>
					{!state.finished1 && <div>
						<div className={style.smaller}>Together, you and thousands of other folks we've deputized, will
							participate in an adventure to find the best games, and the most dedicated gamers.
						</div>
						<div className={style.smaller}>Each day of your 10-day quest, we'll send you a game to play, master, and review... Let us know what you thought, and compete against others to find the most avid gamers.</div>
						<div><p/></div>
						<div className={style.smaller}>In case you're busy, you can always come back a little later by SNOOZING, but only the best players will complete all the steps to master the challenge.</div>
					</div>
					}
					{state.finished1 && <div>
						<div className={style.smaller}>Get in as many plays as you can, and compete with fellow questers for bragging rights
						</div>
						<div className={style.smaller}>Snooze too much, or skip games, and you might not score!</div>
						<div><p/></div>
						<div className={style.smaller}>So limber up your game finger, and let the quest begin.</div>
						<div className={style.cent}>
							<Button raised ripple dense class={style.green}
									onClick={() => this.setState({ finished1: true })}
							>
								Tell Me More
							</Button>
						</div>

					</div>
					}
					<div className={style.cent}>
						<Button  raised ripple dense class={style.green}
								onClick={() => route('/')}
						>
							Quest Forth
						</Button>
					</div>
				</div>
				<Notifications options={{ zIndex: 200, top: '180px' }}/>
			</div>
		);
	}
}
