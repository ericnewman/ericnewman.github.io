import { Component } from 'preact';
import Stars from 'react-star-rating-component';
import { route } from 'preact-router';


import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import style from './style';
import { auth, database } from '../../firebase';
import { notify } from 'react-notify-toast';

export default class Survey1 extends Component {

	waitAndGo(path) {
		setTimeout(function () {
			route(path);
		}, 3000);

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
			this.showToast('Your vote has been recorded.');
			this.waitAndGo('/thanks');
		} else {
			this.showToast('Your vote has been recorded. Let\'s begin our quest');
			this.waitAndGo('/quest');
		}

	}

	showToast(msg) {
		let color = { background: '#583', text: '#FFFFFF' };
		let timeout = 2000;

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

		auth.signInAnonymously().catch(function (error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			// ...
		});

		auth.onAuthStateChanged(function (user) {
			if (user) {
				// User is signed in.
				var isAnonymous = user.isAnonymous;
				var uid = user.uid;
				// ...
			}
			else {
				// User is signed out.
				// ...
			}
		});
	}

	componentWillMount() {
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
							foo += (parseInt(childData[i].toString().match(/(\d+)/)) * i);
						}
					}

					console.log(foo);
				}
				else if (childKey === 'vote_count') {
					tot = childData;
				}


			});

			this.setState({ count: tot, average: Math.round(foo / tot * 100) / 100 });
		});

	}

	render(props, state) {
		let s = 1;
		return (

			<div class={style.bar}>
				<Stars
					name="rate1"
					starCount={5}
					value={props.rating}
					editing={true}
					emptyStarColor={'#393'}
					starColor={'#933'}
					renderStarIcon={(index, value) => {
						if (index === value) {
							return (
								<span class={`${style.vote} ${style.YES}`}>{index}</span>
							);
						}
						else {
							return (
								<span className={`${style.vote} ${style.NO}`}>{index}</span>
							);
						}
					}
					}
					onStarClick={this.onStarClick.bind(this)}/>
				<div class={style.tiny}>Votes: {state.count} - Avg: {state.average}</div>
			</div>
		);
		s = 0;
	}
}
