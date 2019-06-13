import { h, Component } from 'preact';
import SignIn from '../../components/signin';
import Snooze from '../../components/snooze';
import Achievements from '../../components/achievements';
import Leaderboard from '../../components/leaderboard';
import CurrentUser from '../../components/currentuser';
import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import { auth, googleAuthProvider } from '../../firebase';
import style from './style';

export default class Home extends Component {
  constructor() {
    super();

    this.state = {
      currentUser: null,
    };
  }
  	componentDidMount() {

// 		auth.onAuthStateChanged(currentUser => {
//             this.setState({
//               currentUser: auth.currentUser
//             });

// 			const exercisesRef = database.ref(
// 				'/' + this.state.currentUser.uid + '/exercises'
// 			);
//
// 			exercisesRef.on('value', snapshot => {
// 				this.setState({ exercises: snapshot.val() });
// 			});
// 		});
	}


	render() {
        const currentUser = this.state.currentUser;

		return (
			<div class={`${style.home} page`}>
				<h2 class="mdc-typography--title">Game FSD Demo</h2>
				<Card>
					<div class={style.cardHeader}>
						<div class="mdc-typography--caption">Concepts for FSD Integration:</div>
					</div>
					<div class={style.cardBody}>
						Below expect to find various functions to test Games, Scoreboards, Leaderboards, and other calls to action that might be present on a Games-centric FSD.
					</div>
					<Card.Actions>
						<Card.ActionButton>OKAY</Card.ActionButton>
					</Card.Actions>
				</Card>
				 {!currentUser && <div>Not Signed In</div>}
// 				 {currentUser && <CurrentUser user={currentUser} />}
				 {currentUser && <Snooze />}
				 {currentUser && <Achievements />}
				 {currentUser && <Leaderboard />}
			</div>
		);
	}
}
