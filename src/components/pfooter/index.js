import { Component } from 'preact';
import { route } from 'preact-router';
import Stars from 'react-star-rating-component';

import Card from 'preact-material-components/Card';
import Button from 'preact-material-components/Button';
import {  database } from '../../firebase';
import gamesList from '../../gamesList';
import { notify } from 'react-notify-toast';

import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';

import style from './style';

const  timeout = 3500;


export default class PFooter extends Component {


	showToast(msg) {
		let color = { background: '#F83', text: '#FFFFFF' };
		let timeout = timeout;
		document.getElementById('home').classList.add('dim');

		notify.show(msg,
			'custom',
			timeout,
			color);
	}


	waitAndGo(path) {
		setTimeout(() => {
			document.getElementById('home').classList.remove('dim');
			route(path);
		}, timeout/2);

	}

	onStarClick(nextValue) {

		if (this.state.voted) {
			return;
		}
		let name = gamesList[this.props.game_id].name;

		let ref = database.ref('games/' + name + '/review_points');

		ref.transaction(points  => ((points || 0) + nextValue));

		ref = database.ref('games/'+ name + '/rating');
		ref.transaction(average  => {
			average =  Math.round((this.state.review_points/this.state.times_played || 0) * 100) / 100;

			this.setState({
				rating: average,
				voted: true
			});
			return average;
		}
		);
		this.showToast('Thanks for your review - you will be rewarded!');
		this.waitAndGo('/outcome');
	}

	constructor(props) {
		super(props);

		this.state = {
			voted: false
		};
		this.onStarClick = this.onStarClick.bind(this);
	}

	componentWillMount() {
		let name = gamesList[this.props.game_id].name;
		let db = {};

		let ref = database.ref('games/' + name);
		ref.once('value', snapshot => {
			db = snapshot.val();
			this.setState(db);
		});
	}

	render(props, state) {

		return (
			<Card class={style.footer}>
				<div className={style.cardBody}>
					{!props.showStars && <div className={style.cent}>
						<Button
							raised ripple
							onClick={() => props.snoozer()}
						>
							Snooze
						</Button>
					</div>
					}
					{props.showStars &&
					<div className={style.bar}>
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
										<span className={`${style.vote} ${style.YES}`}>{index}</span>
									);
								}

								return (
									<span className={`${style.vote} ${style.NO}`}>{index}</span>
								);

							}
							}
							onStarClick={this.onStarClick.bind(this)}
						/>
						<div class={style.tiny}>Running at an average rating of: {state.rating}</div>
					</div>
					}
				</div>

			</Card>
		);
	}
}