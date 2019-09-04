import {Component } from 'preact';

import Card from 'preact-material-components/Card';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { Carousel } from 'react-responsive-carousel';

import gamesList from '../../gamesList';
import style from './style';

export default class GamesCarousel extends Component {


	newFave(id) {
		let s = this.state;

		s.favoriteGameID = -1;
		this.setState(s);

	}

	playGame(id) {

	}

	clickItem(index, element) {
		if (!this.props.clickable) {
			return;
		}


		let foo = {
			favoriteGameID: gamesList[index].id,
			favoriteGameName: gamesList[index].name,
			favoriteGameURL: gamesList[index].url,
			favoriteGameImage: gamesList[index].image
		};

		this.setState(foo);


		//this.playGame(gamesList[index].id);
	}

	constructor(props) {

		super(props);
		this.props = {
		    showHeader: true,
			showFavorite: true,
			clickable: true
		    };

		this.state = {
			favoriteGameID: -1,
			favoriteGameName: '',
			favoriteGameURL: '',
			timesPlayed: {}
		};

	}


	render(props) {
		let id = this.state.favoriteGameID;
		let hasFave = (id !== -1) && props.showFavorite;

		let tp = 0;
		let games = gamesList.slice(1);


		return (

			<Card>
				{!hasFave && props.showHeader && <div class={style.header}>Select your favorite game below...:</div>}
				{hasFave && <div class={style.faves}>
					<div class={style.header}>Your favorite game is currently "{this.state.favoriteGameName}"</div>
					<div onClick={() => this.playGame(id)}><img height="250" src={this.state.favoriteGameImage} alt={this.state.favoriteGameName} /></div><p />
					<div class={style.header}>You have played "{this.state.favoriteGameName}"
						<span> {tp}</span> times.</div>
					{tp < 5 &&
                                <div class={style.header}>Play {5-tp} more time(s) to unlock a secret level.</div>
					}
					<Button raised ripple onClick={() => this.newFave(id)}><strong>Pick another</strong></Button><p />
				</div>

				}
				{!hasFave &&
				<div class={style.space}><Carousel height="90px"
					transitionTime={750}
					centerMode
					centerSlidePercentage={40}
					showArrows={false}
					infiniteLoop
					autoPlay
					showThumbs={false}
					onClickItem={(index, element) => this.clickItem(index, element)}
				                         >
					{games.map((aGame) => (<div>
						<img src={aGame.image} alt={aGame.name} />
						<p class="legend">{aGame.name}</p>
					</div>))}

				</Carousel> </div>}
			</Card>
		);
	}
}
