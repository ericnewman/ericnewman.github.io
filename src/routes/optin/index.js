import { Component } from 'preact';
import Survey1 from '../../components/survey';
import Typed from 'react-typed';
import Img from 'react-image';
import SignUpButton from '../../components/signup';
import ReactGA from 'react-ga';

import style from './style';
import gamesList from '../../gamesList';


export default class Optin extends Component {

	noThanks() {
		ReactGA.event({
			category: 'No Thanks',
			action: 'Clicked No Thanks',
			value: 0
		});
		document.location.href = 'https://metropcs.com';
	}
	constructor(props) {
		super(props);
		this.props = props;
		const max = 3;

		let rand1 = Math.round(Math.random() * (max)),
			rand2 = Math.round(Math.random() * (max)),
			rand3 = Math.round(Math.random() * (max)),
			rand4 = Math.round(Math.random() * (max)),
			rand5 = Math.round(Math.random() * (max));

		this.setState({
			rand1,
			rand2,
			rand3,
			rand4,
			rand5,
			experiment: rand1 + '/' + rand2 + '/' + rand3 + '/' + rand4 + '/' + rand5,
			images: [
				'frogger.gif',
				'arcade.gif',
				'invaders.gif',
				'pacman.gif'
			],
			titles: [
				'We hope you enjoyed that little break.Why not get these everyday?',
				'Preview is over, but you can join us for daily games!',
				'These games are a blast, Use your phone for something relaxing and fun...',
				'Feel better? These games help! Sign up and play everyday?'
			],
			topmsgs: [
				['Ok, Life is too serious...',
					'How about just something fun...',
					'MetroZONE GAMES!',
					'It\'s FREE!',
					'Join Now'],
				['Lets try something different...',
					'Would like to get some free games every day',
					'MetroZONE GAMES!',
					'It\'s FREE!',
					'Give it a try'],
				['Seriously, you need a break!',
					'How about doing something fun on your phone for a change...',
					'Try MetroZONE GAMES!',
					'It\'s FREE!',
					'Join Now'],
				['Take a break!',
					'How about trying something fun...',
					'Try out MetroZONE GAMES!',
					'It\'s FREE!',
					'Join Up Now']
			],
			offers: [
				['Get FREE GAMES daily. Join today!'],
				['Sign up for FREE GAMES now - Yes it\'s Free!'],
				['Don\'t miss out!'],
				['Take a break today']
			]
		});

		localStorage.setItem('explicitOptOut',  'false');
	}

	render(props, state) {

		return (

			<div class={style.home}>
				<div>
					<div class={style.titles}>
						{state.titles[state.rand1]}
					</div>
					<div class={style.prompt}>
						<Typed strings={state.topmsgs[state.rand2]}
							typeSpeed={140}
							shuffle
							loop
						/>
					</div>
					<div class={style.image}>
						<Img src={'../../../assets/img/' + state.images[state.rand3]} class={style.image}/>
					</div>

					<div className={style.offers}>
						<Typed strings={state.offers[state.rand4]}
							typeSpeed={180}
							loop
						/>
					</div>
					<SignUpButton scenario={state.experiment} experiment={state.rand5} />
					<div class={style.noThanks} onclick={this.nothanks}>No Thanks</div>
				</div>
			</div>
		);
	}
}
