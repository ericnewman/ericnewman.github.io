import { Component } from 'preact';
import GamesCarousel from '../../components/gamescarousel';
import Survey1 from '../../components/survey';
import Logo from '../../components/logo';


export default class Step1 extends Component {

	// saver() {
	//
	// }
	componentDidMount() {
		localStorage.setItem('seenWelcomeMessage', true);
	}

	render() {


		return (
			<div id="home" class="home">
				<Logo />
				<div>
					<div class="smaller">10 days of a new type of gameplay.<br />Play. Rate. Win!<br />
					It's your chance to be heard!
					</div>
					<GamesCarousel showHeader={false} showFavorite={false} clickable={false} />
					<br />
					<div class="smaller">How much do you like playing mobile games (1 to 5)?</div>
					<div class="cent">
						<Survey1 />
					</div>
				</div>
			</div>
		);
	}

}
