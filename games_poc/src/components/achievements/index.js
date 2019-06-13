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
            magic:99
	    }
	};

	//gets called when this route is navigated to
	componentDidMount() {
		//start a timer for the clock:
	}

	//gets called just before navigating away from the route
	componentWillUnmount() {
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
                    <Button raised ripple onClick={(e) => this.setState((state) => {return state.achievement.red++})}>Add Red</Button>
                    <Button raised ripple onClick={(e) => this.setState((state) => {return state.achievement.green++})}>Add Green</Button>
                    <Button raised ripple onClick={(e) => this.setState((state) => {return state.achievement.blue++})}>Add Blue</Button>
                    <p />
                    <Button raised ripple onClick={(e) => this.setState((state) => {return state.achievement.silver++})}>Add Silver</Button>
                    <Button raised ripple onClick={(e) => this.setState((state) => {return state.achievement.gold++})}>Add Gold</Button>
                    <Button raised ripple onClick={(e) => this.setState((state) => {return state.achievement.magic++})}>Add Magic</Button>
                    <p />
				</div>
			</Card>
		</div>);
	}
}