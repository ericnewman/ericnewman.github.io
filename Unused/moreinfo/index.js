import { Component } from 'preact';
import GamesCarousel from '../../src/components/gamescarousel';
import { route } from 'preact-router';
import Button from 'preact-material-components/Button';

import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';

import style from './style';
import './customcar.css';

export default class MoreInfo extends Component {

	render() {

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
					<GamesCarousel class={style.mini} showHeader={false} showFavorite={false} />
					<div class={style.shape}>Shape the Future of</div>
					<div class={style.beta}>DRAFTCARDS</div>
					<div class={style.cent}>
						<Button raised ripple dense class={style.rose}
							onClick={() => route('/')}
						>
							BRING&nbsp;IT&nbsp;ON
						</Button>
					</div>
					<div class={style.cent}>

						<Button ripple secondary
							onClick={() => route('/')}
						>
							Close
						</Button>
					</div>
				</div>
			</div>
		);
	}
}
