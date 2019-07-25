import { Component } from 'preact';
import GamesCarousel from '../../components/gamescarousel';
import Survey1 from '../../components/survey1';

import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';

import style from './style';


export default class Step1 extends Component {

	saver() {

	}


	render() {


		return (
			<div id="home" className="home">
				<div>
					<div className="logo" >
						<div className="urup" />
						<div className="beta" />
					</div>
				</div>
				<div>
					<div className="smaller">10 days of a new type of gameplay.<br/>Play. Rate. Win!<br/>
					It's your chance to be heard!
					</div>
					<GamesCarousel showHeader={false} showFavorite={false} clickable={false} />
					<br />
					<div className="smaller">How much do you like playing mobile games (1 to 5)?</div>
					<div className="cent">
						<Survey1 saver={this.saver} />
					</div>
				</div>
			</div>
		);
	}
}
