import { h, Component } from 'preact';
import SignIn from '../../components/signin';
import Snooze from '../../components/snooze';

// Import Preact and SmoothSlider, SmoothSlide assets
import GamesCarousel from '../../components/gamescarousel';
//css assets (npm install)
//import 'SmoothSlider/component/styles.css';

import Achievements from '../../components/achievements';
import Leaderboard from '../../components/leaderboard';
import CurrentUser from '../../components/currentuser';
import LogRocket from 'logrocket';
import Card from 'preact-material-components/Card';
import { auth, googleAuthProvider } from '../../firebase';
import firebase from 'firebase/app';

import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import style from './style';

        //custom SmoothSlider options desciption styles other than background

const customDescriptionStyles = {
  right: 0,
  opacity: 0.6,
  transform: 'translateX(100%)'
};


export default class Home extends Component {

      constructor() {
        super();

        this.state = {
          currentUser: null,
        };
      }

    writeUserData(userId, name, email, imageUrl) {
          firebase.database().ref('users/' + userId.replace(/[,@).]/gi, '_')).set({
            username: name,
            email: email,
            profile_picture : imageUrl
          });
        }

  	componentDidMount() {

		auth.onAuthStateChanged(currentUser => {
            this.setState({
              currentUser: auth.currentUser
            });
            if(auth && auth.currentUser) {
                this.writeUserData(auth.currentUser.email,
                                   auth.currentUser.displayName,
                                   auth.currentUser.email,
                                   auth.currentUser.photoURL);
            }
		});

        if(auth && auth.currentUser && auth.currentUser.displayName) {
            LogRocket.identify(auth.currentUser.displayName, {
              name: auth.currentUser.displayName,
              email: auth.currentUser.email,

              // Add your own custom user variables here, ie:
              subscriptionType: 'demo'
            });
        }

// 			const exercisesRef = database.ref(
// 				'/' + this.state.currentUser.uid + '/exercises'
// 			);
//
// 			exercisesRef.on('value', snapshot => {
// 				this.setState({ exercises: snapshot.val() });
// 			});

	}


	render() {
        var currentUser, username = "Not Logged In";

        if(auth && auth.currentUser && auth.currentUser.displayName) {
            username = auth.currentUser.displayName;
            currentUser = auth.currentUser;
        } else {
            username = "Not Logged In";
        }

		return (
			<div class={`${style.home} page`}>
				<h3 class="mdc-typography--title">Game FSD Demo</h3>
				 {!currentUser && <SignIn />}
				 {currentUser && <CurrentUser user={currentUser} />}
                  <GamesCarousel  />
				 {<Snooze />}
				 {currentUser && <Achievements />}
				 {currentUser && <Leaderboard />}

			</div>
		);
	}
}
