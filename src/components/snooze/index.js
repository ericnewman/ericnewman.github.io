import { h, Component } from 'preact';
import { route } from 'preact-router';

import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import Button from 'preact-material-components/Button';
import { notify } from 'react-notify-toast';

import style from './style';

export default class Snooze extends Component {
	state = {
		time: Date.now(),
		interval: 0
	};
	//update the current time
	updateTime = () => {
		this.setState({ time: Date.now() });
	};

	doSnooze = (interval) => {
		this.interval = interval;
		let timeout=3000;

		let color = { background: '#58F', text: '#FFFFFF' };
		document.getElementById('home2').classList.add('dim');

		notify.show('See you soon! Be back in ' + this.interval + ' Minutes...',
			'custom',
			timeout,
			color);

		setTimeout(() => {
			document.getElementById('home2').classList.remove('dim');

			route('/dark/' + (interval*3600));
		}, timeout);
	};

	//Note: `user` comes from the URL, courtesy of our router
	render() {
		return (
			<div id="home2" class={style.newpage}>
				<Card>
					<div className="caption"> Snooze:</div>
					<div class={style.cardBody}>
						<div className="grid">
							<div class="mdc-typography--caption">Snooze the content to re-appear after the following interval:</div>
							<div class={style.bgroup}>
								<Button raised ripple dense onClick={(e) => this.doSnooze(10)}>10 Min</Button>
								<Button raised ripple dense onClick={(e) => this.doSnooze(30)}>30 Min</Button>
								<Button raised ripple dense onClick={(e) => this.doSnooze(60)}>1 Hr</Button>
							</div>
							<div class={style.bgroup}>
								<Button raised ripple dense onClick={(e) => this.doSnooze(120)}>2 Hrs</Button>
								<Button raised ripple dense onClick={(e) => this.doSnooze(480)}>4 Hrs</Button>
								<Button raised ripple dense onClick={(e) => this.doSnooze(3600)}>1 Day</Button>
							</div>
						</div>
					</div>
				</Card>
			</div>);
	}
}