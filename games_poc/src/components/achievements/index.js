import { Component } from 'preact';
import { auth, database } from '../../firebase';

import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import style from './style';
import Button from 'preact-material-components/Button';

import games_list from '../../games_list';

export default class Achievements extends Component {

	constructor() {
		super();

		let myDB = database.ref('users/' + auth.currentUser.uid + '/achievements');

		this.state = {
			total_achievements: 0,
			achievements: { }
		};

		myDB.on('value', (snapshot) => {
			let foo = {};
			let tot = 0;

			snapshot.forEach((childSnapshot) => {

				let childKey = childSnapshot.key;
				let childData = childSnapshot.val();

				// Crazy new syntax for computed property names []

				foo[childKey] = childData;
				tot += childData;
			});
			this.setState({ achievements: foo, total_achievements: tot });
		});
	}

	//gets	called	when	this	route	is	navigated	to
	componentDidMount() {
	}

	//gets	called	just before	navigating	away	from	the	route
	componentWillUnmount() {
	}


	bumpAchievement(achievement) {
		let user = auth.currentUser.uid;

		let ref = database.ref('users/' + user + '/achievements/' + achievement);
		ref.transaction((numberOfTimesPlayed) =>
			// If numberOfTimesPlayed has never been set, numberOfTimesPlayed will be `null`.
			(numberOfTimesPlayed || 0) + 1
		);

		database.ref('users/' + user).update({
			total_achievements: this.state.total_achievements
		});

	}

	//Note:	`user` comes from the URL, courtesy	of our router
	render() {
		let achs = this.state.achievements;
		return (
			<div class={style.newpage}>
				<Card>
					<div class={style.cardBody}>
						<div class={style.mylabel}>Achievements:</div>
						<div class="mdc-typography--caption">You have a total of {this.state.total_achievements} achievements.</div>
						<p />
						<div class={style.bgroup}>
							<span class={`${style.achievement}	${style.red}`}>{achs.red}</span>
							<span class={`${style.achievement}	${style.green}`}>{achs.green}</span>
							<span class={`${style.achievement}	${style.blue}`}>{achs.blue}</span>
							<span
								class={`${style.achievement}	${style.silver}`}
							>{achs.silver}</span>
							<span class={`${style.achievement}	${style.gold}`}>{achs.gold}</span>
							<span class={`${style.achievement}	${style.magic}`}>{achs.magic}</span>
						</div>
						<p />
						<div class={style.mylabel}>Add an achievement</div>
						<div class={style.bgroup}>
							<Button raised ripple onClick={(e) => this.bumpAchievement('red')}>Add Red</Button>
							<Button raised ripple onClick={(e) => this.bumpAchievement('green')}>Add Green</Button>
							<Button raised ripple onClick={(e) => this.bumpAchievement('blue')}>Add Blue</Button>
							<p />
							<Button raised ripple onClick={(e) => this.bumpAchievement('silver')}>Add Silver</Button>
							<Button raised ripple onClick={(e) => this.bumpAchievement('gold')}>Add Gold</Button>
							<Button raised ripple onClick={(e) => this.bumpAchievement('magic')}>Add Magic</Button>
						</div>
						<p />
					</div>
				</Card>
			</div>);
	}
}