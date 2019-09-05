import { Component } from 'preact';
import Stars from 'react-star-rating-component';
import { route } from 'preact-router';
import { database } from '../../firebase';
import { notify } from 'react-notify-toast';
import ReactGA from 'react-ga';

import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';

import style from './style';
import Button from 'preact-material-components/Button';

const timeout = 2000;

export default class Survey1 extends Component {

	waitAndGo(path) {
		setTimeout(() => {
			document.getElementById('home').classList.remove('dim');
			route(path);
		}, timeout + 500);
	}
	waitAndDismiss() {
		setTimeout(() => {
			document.getElementById('home').classList.remove('dim');

			if (!this.props.noexit) {
				if (window && window.MP) {
					MP.dismiss();
				}
				else {
					window.open('', '_self', '').close();
					document.location.href = 'http://google.com';
				}
			}
		}, timeout + 500);
	}

	more() {
		ReactGA.event({
			category: 'Navigate',
			action: 'User selected More Games from Last Page',
			label: 'More Games',
			value: 0
		});

		document.location.href= 'https://games-metropcs.arkadiumarena.com/?arkpromo=metrozone_discover';
	}

	onStarClick(nextValue, prevValue, name) {

		if (this.props.final) {
			ReactGA.event({
				category: 'Final Survey',
				action: 'User liked games ' + nextValue,
				label: 'User liked games ' + nextValue,
				value: nextValue
			});

			let ref = database.ref('likedplay/vote_count');

			ref.transaction((numberOfVotes) =>
			// If numberOfVotes has never been set, numberOfVotes will be `null`.
				(numberOfVotes || 0) + 1
			);

			ref = database.ref('likedplay/ratings/' + nextValue);
			ref.transaction((numberOfVotes) =>
			// If numberOfVotes has never been set, numberOfVotes will be `null`.
				(numberOfVotes || 0) + 1
			);
			this.showToast('Awesome. Thanks for your vote!');
			this.waitAndDismiss();
			this.setState({ voted: true });

		}
		else {
			this.setState({ rating: nextValue });
			localStorage.setItem('explicitOptOut', nextValue);

			ReactGA.event({
				category: 'Survey',
				action: 'User likes games ' + nextValue,
				label: 'User likes games ' + nextValue,
				value: nextValue
			});


			let ref = database.ref('likesplay/vote_count');
			ref.transaction((numberOfVotes) =>
				// If numberOfVotes has never been set, numberOfVotes will be `null`.
				(numberOfVotes || 0) + 1
			);

			ref = database.ref('likesplay/ratings/' + nextValue);
			ref.transaction((numberOfVotes) =>
				// If numberOfVotes has never been set, numberOfVotes will be `null`.
				(numberOfVotes || 0) + 1
			);
			//this.props.saver(nextValue);


			if (nextValue < 3) {
				this.showToast('Awesome. You\'ve been heard.');
				this.waitAndGo('/thanks');
			}
			else {
				this.showToast('Awesome. You\'ve been heard. Let\'s get rolling');
				this.waitAndGo('/quest');
			}
		}

	}

	showToast(msg) {
		let color = { background: 'none', text: '#FFFFFF' };
		document.getElementById('home').classList.add('dim');
		document.getElementById('toastBox').classList.add('pinkBox');
		notify.show(msg,
			'custom',
			timeout,
			color);
		setTimeout(() => {
			document.getElementById('toastBox').classList.remove('pinkBox');
		}, timeout + 300);

	}


	constructor(props) {
		super(props);
		this.state = {
			rating: 1,
			average: 0,
			count: 0,
			voted: false,
			noexit: props.noexit
		};
	}

	componentWillMount() {

		if (typeof window !== 'undefined') {
			let myDB = {};

			if (this.props.final) {
				myDB = database.ref('likedplay');
			}
			else {
				myDB = database.ref('likesplay');
			}

			myDB.on('value', (snapshot) => {
				let foo = 0;
				let tot = 0;

				snapshot.forEach((childSnapshot) => {

					let childKey = childSnapshot.key;
					let childData = childSnapshot.val();

					if (childKey === 'ratings') {
						for (let i = 1; i <= childData.length; i++) {
							if (childData[i]) {
								foo += (parseInt(childData[i].toString().match(/(\d+)/), 10) * i);
							}
						}
					}
					else if (childKey === 'vote_count') {
						tot = childData;
					}
				});

				this.setState({ count: tot, average: Math.round(foo / tot * 100) / 100 });
			});
		}
	}

	render(props, state) {
		return (

			<div class={style.bar}>
				{props.final && !state.voted && <div class="smaller">
					How much did you enjoy discovering and playing games this way (1 to 5)?
				</div>}
				{!state.voted &&
				<Stars
					name="rate1"
					starCount={5}
					value={props.rating}
					editing
					emptyStarColor={'#393'}
					starColor={'#933'}
					renderStarIcon={(index, value) => {

						if (index === value) {
							return (
								<span class={`${style.vote} btn${index} ${style.YES} `}><span class={style.num}>{index}</span></span>
							);
						}

						return (
							<span class={`${style.vote} btn${index} ${style.NO}`}><span class={style.num}>{index}</span></span>
						);

					}
					}
					onStarClick={this.onStarClick.bind(this)}
				/>}
				{state.voted && props.final &&
				<div className={style.buts}>
					<Button class={style.pinkButton} onClick={() => this.more()}>
					more games
					</Button>
				</div>

				}
			</div>
		);
	}
}
