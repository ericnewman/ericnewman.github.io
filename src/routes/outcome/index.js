import { Component } from 'preact';
import Notifications from 'react-notify-toast';
import { route } from 'preact-router';

import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';

import Button from 'preact-material-components/Button';

import style from './style';
import CoinBar from '../../components/coinbar';

export default class Outcome extends Component {

	constructor(props) {
		super(props);

		this.state = {
			finished1: false,
			finished2: false
		};
	}


	render(props, state) {

		return (
			<div class={`${style.home} page`}>
				<div>
					<div><p/></div>
					<div className={style.beta}>DRAFTCARDS</div>
					<div class={style.smaller}>Thank you fearless adventurer.</div>
					<div><p/></div>
					{!state.finished1 && <div>
						<div className={style.smaller}>We'll see you again soon for your next mission in THE QUEST.
						</div>
						<div className={style.smaller}>In the mean time, rest your thumbs, and be sure to tak
							nourishment.
						</div>
					</div>
					}
					{!state.finished1 && <div>
						<div className={style.smaller}>Remember, you can save this app to your phone's home screen, and
							play whenever for additional missions and rewards.
						</div>
						<div className={style.cent}>
							<Button raised ripple dense class={style.green}
									onClick={() => this.setState({ finished1: true })}
							>
								How'd I do?
							</Button>
						</div>

					</div>
					}
					{state.finished1 && <div className={style.cent}>

						<CoinBar title="HUSTLE" progress={50}/>
						<CoinBar title="SNOOZE" progress={40}/>
						<CoinBar title="FLOW" progress={30}/>
					</div>
					}
					<div className={style.cent}>
						<Button raised ripple dense class={style.green}
								onClick={() => route('/dash/1')}
						>
							Play Again
						</Button>
					</div>

				</div>
				< Notifications options={{ zIndex: 200, top: '180px' }}/>
			</div>
		);
	}
}
