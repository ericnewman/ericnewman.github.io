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

		this.state = {
			favoriteGameIndex: -1,
			favoriteGameName: '',
			favoritegameURL: '',
			timesPlayed: [0,0,0,0,0,0,0,0,0,0]
		};

		if (typeof window !== 'undefined') {
			let s = JSON.parse(localStorage.getItem('savedFavorite'));
			if (s && s.favoriteGameIndex !== -1) {
				this.setState(s);
			}
			games_list.map((game) => {

				database.ref('games/' + game.name).update({
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

	newFave(index) {
		this.setState({ favoriteGameIndex: -1 });
		if (typeof window !== 'undefined') {
			localStorage.setItem('savedFavorite', JSON.stringify(this.state));
		}
		database.ref('users/' + auth.currentUser.uid).update({
			fave_game: games_list[index].name
		});
		this.props.params.favoriteGameName = games_list[index].name;

	}

	playGame(index) {

		let tp = this.state.timesPlayed;
		tp[index]++;
		this.setState({ timesPlayed: tp });
		localStorage.setItem('savedFavorite', JSON.stringify(this.state));


		let ref = database.ref('users/' + auth.currentUser.uid + '/games_played/' + games_list[index].name + '/times_played');
		ref.transaction((numberOfTimesPlayed) =>
		// If numberOfTimesPlayed has never been set, numberOfTimesPlayed will be `null`.
			 (numberOfTimesPlayed || 0) + 1
		);

		ref = database.ref('games/' + games_list[index].name + '/times_played');
		ref.transaction((numberOfTimesPlayed) =>
			// If numberOfTimesPlayed has never been set, numberOfTimesPlayed will be `null`.
			 (numberOfTimesPlayed || 0) + 1
		);

		ref = database.ref('users/' + auth.currentUser.uid + '/total_plays');
		ref.transaction((total_plays) =>
			// If numberOfTimesPlayed has never been set, numberOfTimesPlayed will be `null`.
			 (total_plays || 0) + 1
		);


		document.location = games_list[index].url;
	}

	clickItem(index, element) {

		let foo = { favoriteGameIndex: index , favoriteGameName: games_list[index].name, favoritegameURL: games_list[index].url };

		this.setState(foo);

		localStorage.setItem('savedFavorite', JSON.stringify(this.state));

		if (confirm("You've selected " + games_list[index].name + ' as your favorite game...Would you like to play it now?')) {
			let tp = this.state.timesPlayed;
			tp[index]++;
			this.setState({ timesPlayed: tp });
			localStorage.setItem('savedFavorite', JSON.stringify(this.state));
			this.playGame(index);
		}
		else {
			this.showToast("We'll try later...");
		}
	}

	render() {
		let hasFave = (this.state.favoriteGameIndex !== -1);
		let index = this.state.favoriteGameIndex;

		return (

			<Card>
				{!hasFave && <div class={style.header}>Select your favorite game below...:</div>}
				{hasFave && <div class={style.faves}>
					<div class={style.header}>Your favorite game is currently "{this.state.favoriteGameName}"</div>
					<div onClick={() => this.playGame(index)}><img height="250" src={games_list[index].image} alt={games_list[index].name} /></div><p />
					<div class={style.header}>You have played "{this.state.favoriteGameName}"
						<span> {this.state.timesPlayed[index]}</span> times.</div>
					{this.state.timesPlayed[index] < 5 &&
                                <div class={style.header}>Play {5-this.state.timesPlayed[index]} more time(s) to unlock a secret level.</div>
					}
					<Button raised ripple onClick={() => this.newFave(index)}><strong>Pick another</strong></Button><p />
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
