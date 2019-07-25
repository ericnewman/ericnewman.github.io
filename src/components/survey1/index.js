import { Component } from 'preact';
import Stars from 'react-star-rating-component';
import { route } from 'preact-router';
import { auth, database } from '../../firebase';
import { notify } from 'react-notify-toast';

import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import style from './style';

export default class Survey1 extends Component {

	waitAndGo(path) {
		setTimeout(() => {
			document.getElementById('home').classList.remove('dim');
			route(path);
		}, 2100);
	}

	onStarClick(nextValue, prevValue, name) {

		this.setState({ rating: nextValue });

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
		this.props.saver(nextValue);
		if (nextValue < 3) {
			this.showToast('Awesome. You\'ve been heard.');
			this.waitAndGo('/thanks');
		}
		else {
			this.showToast('Awesome. You\'ve been heard. Let\'s get rolling');
			this.waitAndGo('/quest');
		}

	}

	showToast(msg) {
		let color = { background: '#FF008C', text: '#FFFFFF' };
		let timeout = 2000;
		document.getElementById('home').classList.add('dim');
		notify.show(msg,
			'custom',
			timeout,
			color);

	}


	constructor(props) {
		super(props);
		this.state = {
			rating: 1,
			average: 0,
			count: 0
		};
		if (typeof window !== 'undefined') {
			auth.signInAnonymously().catch((error) => {
				// Handle Errors here.
				// let errorCode = error.code;
				// let errorMessage = error.message;
				// ...
			});

			auth.onAuthStateChanged((user) => {
				if (user) {
					// User is signed in.
					// let isAnonymous = user.isAnonymous;
					// let uid = user.uid;
					// ...
				}
				else {
					// User is signed out.
					// ...
				}
			});
		}
	}

	componentWillMount() {

		if (typeof window !== 'undefined') {
			let myDB = database.ref('likesplay');

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
							<span className={`${style.vote} btn${index} ${style.NO}`}><span class={style.num}>{index}</span></span>
						);

					}
					}
					onStarClick={this.onStarClick.bind(this)}
				/>
				<div class={style.tiny}>Votes: {state.count} - Avg: {state.average}</div>
			</div>
		);
	}
}
