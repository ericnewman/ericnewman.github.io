import { h, Component } from 'preact';
import { auth, database } from '../../firebase';

import Card from 'preact-material-components/Card';
import Button from 'preact-material-components/Button';

import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';

import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { Carousel } from 'react-responsive-carousel';
import  { notify } from 'react-notify-toast';
import games_list from '../../games_list';
import style from './style';

export default class GamesCarousel extends Component {

	constructor() {

		super();
		this.games= [];

		this.state = {
			favoriteGameID: -1,
			favoriteGameName: '',
			favoritegameURL: '',
			timesPlayed: {}
		};

		if (typeof window !== 'undefined') {
			let s = JSON.parse(localStorage.getItem('savedFavorite'));
			if (s && s.favoriteGameID !== -1) {
				this.setState(s);
			}

			games_list.map((game) => {
				this.games[game.id] = game;
				database.ref('games/' + game.name).update({
					id: game.id,
					thumbnail: game.image,
					url: game.url,
					name: game.name
				});
			});
		}
	}

	showToast(msg) {
		let color = { background: '#5A3', text: '#FFFFFF' };
		let timeout = 2000;

		notify.show(msg,
			'custom',
			timeout,
			color);
	}

	newFave(id) {
		let s = this.state;

		s.favoriteGameID = -1;
		this.setState(s);

	}

	playGame(id) {
		let name = this.games[id].name;
		let tp = 0;

		if (this.state.timesPlayed[id]) {
			tp =  this.state.timesPlayed[id]++;
		}
		else {
			tp = 1;
		}
		this.state.timesPlayed[id] = tp;

		this.setState( this.state);
		localStorage.setItem('savedFavorite', JSON.stringify(this.state));


		let ref = database.ref('users/' + auth.currentUser.uid + '/games_played/' + name + '/times_played');
		ref.transaction((numberOfTimesPlayed) =>
		// If numberOfTimesPlayed has never been set, numberOfTimesPlayed will be `null`.
			 (numberOfTimesPlayed || 0) + 1
		);

		ref = database.ref('games/' + name + '/times_played');
		ref.transaction((numberOfTimesPlayed) =>
			// If numberOfTimesPlayed has never been set, numberOfTimesPlayed will be `null`.
			 (numberOfTimesPlayed || 0) + 1
		);

		ref = database.ref('users/' + auth.currentUser.uid + '/total_plays');
		ref.transaction((total_plays) =>
			// If numberOfTimesPlayed has never been set, numberOfTimesPlayed will be `null`.
			 (total_plays || 0) + 1
		);


		// document.location = games_list[index].url;
	}

	clickItem(index, element) {

		let foo = {
			favoriteGameID: games_list[index].id,
			favoriteGameName: games_list[index].name,
			favoriteGameURL: games_list[index].url,
			favoriteGameImage: games_list[index].image
		};

		this.setState(foo);

		localStorage.setItem('savedFavorite', JSON.stringify(this.state));

		if (confirm("You've selected " + games_list[index].name + ' as your favorite game...Would you like to play it now?')) {
			this.playGame(games_list[index].id);
		}
		else {
			this.showToast("We'll try later...");
		}
	}

	render() {
		let id = this.state.favoriteGameID;
		let hasFave = (id !== -1);
		let tp = 0;

		return (

			<Card>
				{!hasFave && <div class={style.header}>Select your favorite game below...:</div>}
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
				{!hasFave && <div class={style.space}><Carousel height="90px"
					transitionTime={750}
					centerMode
					centerSlidePercentage={40}
					showArrows={false}
					infiniteLoop
					autoPlay
					showThumbs={false}
					onClickItem={(index, element) => this.clickItem(index, element)}
				                                      >
					<div>
						<img src={games_list[0].image} alt={games_list[0].name} />
						<p className="legend">{games_list[0].name}</p>
					</div>
					<div>
						<img src={games_list[1].image} alt={games_list[1].name} />
						<p className="legend">{games_list[1].names}</p>
					</div>
					<div>
						<img src={games_list[2].image} alt={games_list[2].name} />
						<p className="legend">{games_list[2].name}</p>
					</div>
					<div>
						<img src={games_list[3].image} alt={games_list[3].name} />
						<p className="legend">{games_list[3].name}</p>
					</div>
					<div>
						<img src={games_list[4].image} alt={games_list[4].name} />
						<p className="legend">{games_list[4].name[4]}</p>
					</div>
					<div>
						<img src={games_list[5].image} alt={games_list[5].name} />
						<p className="legend">{games_list[5].name}</p>
					</div>
				</Carousel> </div>}
			</Card>
		);
	}
}
