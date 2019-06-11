import { h, Component } from 'preact';
import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import style from './style';
import Button from 'preact-material-components/Button';

export default class Achievements extends Component {
	state = {
	    achievement : {
            red: 0,
            green:1,
            blue:2,
            silver:9,
            gold:20,
            platinum:99,
            v:"ABC"
	    }
	};

	//gets called when this route is navigated to
	componentDidMount() {
		//start a timer for the clock:
	}

	//gets called just before navigating away from the route
	componentWillUnmount() {
	}

	updateAchievement(state, val) {
	    this.setState(state, val);
	    console.log(this.state);
	}

	//Note: `user` comes from the URL, courtesy of our router
	render({ user }, { time, count }) {
		return (
		<div class={style.newpage}>
			<Card>
				<div class={style.cardBody}>
				    <div class={style.mylabel}>Achievements:</div>
                    <div class="mdc-typography--caption">The follow list of achievements were found for this user:</div>
                        <div>
                            <span class={style.achievement}>{this.state.achievement.red}</span>
                            <span class={style.achievement}>{this.state.achievement.green}</span>
                            <span class={style.achievement}>{this.state.achievement.blue}</span>
                            <span class={style.achievement}>{this.state.achievement.silver}</span>
                            <span class={style.achievement}>{this.state.achievement.gold}</span>
                            <span class={style.achievement}>{this.state.achievement.platinum}</span>
                        </div>
                    <p />
                    <div class="mdc-typography--caption">Add the following Achievements</div>
                    <p>

					<p />
					    <Button raised ripple onClick={this.updateAchievement(this.state.achievement.red, 123)} >Add Red</Button>
                        <Button raised ripple onClick={(e) => this.do_snooze(30)}>Add Green</Button>
                        <Button raised ripple onClick={(e) => this.do_snooze(60)}>Add Blue</Button>
                        <p />
                        <Button raised ripple onClick={(e) => this.do_snooze(120)}>Add Silver</Button>
                        <Button raised ripple onClick={(e) => this.do_snooze(480)}>Add Gold</Button>
                        <Button raised ripple onClick={(e) => this.do_snooze(3600)}>Add Platinum</Button>

				</p>
				</div>
			</Card>
		</div>);
	}
}