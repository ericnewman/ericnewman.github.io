import { h, Component } from 'preact';
import { auth, googleAuthProvider } from '../../firebase';

import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import style from './style';
import Button from 'preact-material-components/Button';
import firebase from 'firebase/app'

export default class Achievements extends Component {

     myDB = firebase.database().ref('users/' + auth.currentUser.email.replace(/[,@).]/gi, '_'));

	 state = {
	    achievement : {
            red: 0,
            green:1,
            blue:2,
            silver:9,
            gold:20,
            magic:99
	    }
	};

	//gets called when this route is navigated to
	componentDidMount() {
       this.myDB.on('value', snapshot => {
            const state = snapshot.val();
            this.setState(state);

        });
	}

	//gets called just before navigating away from the route
	componentWillUnmount() {
	}

    writeUserAchievement(userId, achievement) {
      this.myDB.set({
        achievement: achievement,
      });
    }


    bumpAchievement(achievement) {
        var val;
        var user = auth.currentUser.email;

        switch(achievement) {
            case "red":
                val = this.state.achievement.red++;
                break;
            case "green":
                val = this.state.achievement.green++;
                break;
            case "blue":
                val = this.state.achievement.blue++;
                break;
            case "silver":
                val = this.state.achievement.silver++;
                break;
            case "gold":
                val = this.state.achievement.gold++;
                break;
            case "magic":
                val = this.state.achievement.magic++;
                break;
        }
        this.writeUserAchievement(user, this.state.achievement);
        this.setState(this.state);
    }

	//Note: `user` comes from the URL, courtesy of our router
	render({ user }, { time, count }) {
		return (
		<div class={style.newpage}>
			<Card>
				<div class={style.cardBody}>
				    <div class={style.mylabel}>Achievements:</div>
                    <div class="mdc-typography--caption">The follow list of achievements were found for this user:</div>
                    <p />
                    <div>
                        <span class={`${style.achievement} ${style.red}`}>{this.state.achievement.red}</span>
                        <span class={`${style.achievement} ${style.green}`}>{this.state.achievement.green}</span>
                        <span class={`${style.achievement} ${style.blue}`}>{this.state.achievement.blue}</span>
                        <span class={`${style.achievement} ${style.silver}`}>{this.state.achievement.silver}</span>
                        <span class={`${style.achievement} ${style.gold}`}>{this.state.achievement.gold}</span>
                        <span class={`${style.achievement} ${style.magic}`}>{this.state.achievement.magic}</span>
                    </div>
                    <p />
                    <div class="mdc-typography--caption">Add the following Achievements</div>
                    <Button raised ripple onClick={(e) => this.bumpAchievement("red")}>Add Red</Button>
                    <Button raised ripple onClick={(e) => this.bumpAchievement("green")}>Add Green</Button>
                    <Button raised ripple onClick={(e) => this.bumpAchievement("blue")}>Add Blue</Button>
                    <p />
                    <Button raised ripple onClick={(e) =>  this.bumpAchievement("silver")}>Add Silver</Button>
                    <Button raised ripple onClick={(e) =>  this.bumpAchievement("gold")}>Add Gold</Button>
                    <Button raised ripple onClick={(e) => this.bumpAchievement("magic")}>Add Magic</Button>
                    <p />
				</div>
			</Card>
		</div>);
	}
}