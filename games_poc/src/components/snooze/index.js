import { h, Component } from 'preact';
import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import style from './style';
import Button from 'preact-material-components/Button';

export default class Snooze extends Component {
	state = {
		time: Date.now(),
		interval: 0
	};

	//gets called when this route is navigated to
	componentDidMount() {
		//start a timer for the clock:
		this.timer = setInterval(this.updateTime, 1000);
	}

	//gets called just before navigating away from the route
	componentWillUnmount() {
		clearInterval(this.timer);
	}

	//update the current time
	updateTime = () => {
		this.setState({ time: Date.now() });
	};

	do_snooze = (interval) => {
        this.interval = interval;
	    alert(this.interval);
	};

	//Note: `user` comes from the URL, courtesy of our router
	render({ user }, { time, count }) {
		return (
		<div class={style.newpage}>
			<Card>
			<div class={style.mylabel}>Snooze:</div>
				<div class={style.cardBody}>
				<p>Snooze the content to re-show after the following interval:</p>
				<p>
					<Button raised ripple onClick={this.do_snooze(10)}>10 Min</Button>
					<Button raised ripple onClick={this.do_snooze(30)}>30 Min</Button>
					<Button raised ripple onClick={this.do_snooze(60)}>1 Hr</Button>
					<p />
					<Button raised ripple onClick={this.do_snooze(120)}>2 Hrs</Button>
					<Button raised ripple onClick={this.do_snooze(480)}>4 Hrs</Button>
					<Button raised ripple onClick={this.do_snooze(3600)}>1 Day</Button>
					<p />
				</p>
				</div>
			</Card>
		</div>);
	}
}