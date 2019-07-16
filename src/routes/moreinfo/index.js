import { Component } from 'preact';
import { auth } from '../../firebase';
import Notifications from 'react-notify-toast';
import GamesCarousel from '../../components/gamescarousel';
import { route } from 'preact-router';

import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';

import Button from 'preact-material-components/Button';

import style from './style';
import './customcar.css';

export default class MoreInfo extends Component {


	render() {
		let currentUser;

		if (auth && auth.currentUser && auth.currentUser.displayName) {
			currentUser = auth.currentUser;
		}

		return (
			<div class={`${style.home} page`}>
				<div class={style.main}>
					<div class={style.beta}>DRAFTCARDS</div>
					<div class={style.smallerBold}>DraftCARDS will bring daily casual gameplay fun shared randomly at
						phone unlock.
					</div>
					<div class={style.smaller}>In this beta you will help craft the future of this experience by
						playing, and competing against others as well as rating the games.
					</div>
					<div class={style.smaller}>Play twice daily with the option to snooze your opportunity to play, but
						be wayrned, the only wau to achieve maximum success on the leaderboard is to play right away.
					</div>
					<GamesCarousel class={style.mini} showHeader={false} showFavorite={false}/>
					<div class={style.shape}>Shape the Future of</div>
					<div class={style.beta}>DRAFTCARDS</div>
					<div class={style.cent}>
						<Button raised ripple dense class={style.green}
								onClick={() => route('/')}>
							BRING&nbsp;IT&nbsp;ON
						</Button>
					</div>
					<div class={style.cent}>

						<Button ripple secondary
								onClick={() => route('/')}>
							Close
						</Button>
					</div>
				</div>
				<Notifications options={{ zIndex: 200, top: '180px' }}/>
			</div>
		);
	}
}
