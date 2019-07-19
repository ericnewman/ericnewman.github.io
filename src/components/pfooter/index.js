import { Component } from 'preact';
import { route } from 'preact-router';
import Stars from 'react-star-rating-component';

import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import Button from 'preact-material-components/Button';
import 'preact-material-components/LayoutGrid/style.css';

import style from './style';
import { auth, database } from '../../firebase';
import gamesList from '../../gamesList';
import { notify } from 'react-notify-toast';


export default class PFooter extends Component {

	showToast(msg) {
		let color = { background: '#F83', text: '#FFFFFF' };
		let timeout = 5500;

		notify.show(msg,
			'custom',
			timeout,
			color);
	}


	waitAndGo(path) {
		setTimeout(() => {
			route(path);
		}, 2500);

	}

	onStarClick(nextValue) {

		if (this.state.voted) {
			return;
		}
		let name = gamesList[this.props.game_id].name;
		let totalPoints= 0;
		let totalPlays = 0;

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

	componentWillMount() {
		let name = gamesList[this.props.game_id].name;
		let db = {};

		let ref = database.ref('games/' + name);
		ref.once('value', snapshot => {
			db = snapshot.val();
			this.setState(db);
			console.log(this.state);
		});

	}
	constructor(props) {
		super(props);

		this.state = {
			voted: false
		};
		this.onStarClick = this.onStarClick.bind(this);
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