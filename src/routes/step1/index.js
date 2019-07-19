import { Component } from 'preact';
import GamesCarousel from '../../components/gamescarousel';
import Survey1 from '../../components/survey1';

import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';


import style from './style';
import './customcar.css';

export default class Step1 extends Component {

	saver(val) {
		// console.log(val);
	}

	constructor() {

		super();
		this.props = {
			currentUser: 'No User'
		};
	}

	render() {

		return (
			<div id="home" class={`${style.home} page`}>
				<div>
					<div class={style.beta}>ITS ALMOST HERE!</div>
					<p />
					<div class={style.beta}>DRAFTCARDS</div>
					<div class={style.betaRot}>BETA!</div>
					<div class={style.smaller}>1 week of fast, free, and fun game play and YOUR<br />chance to be heard!
					</div>
					<GamesCarousel class={style.mini} showHeader={false} showFavorite={false} clickable={false} />
					<div class={style.smaller}>On a scale of 1 to 5, how much do you like playing games on your mobile phone?</div>
					<div class={style.cent}>
						<Survey1 saver={this.saver} />
					</div>
				</div>
			</div>
		);
	}
}
