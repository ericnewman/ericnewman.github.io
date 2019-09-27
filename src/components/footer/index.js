import { Component } from 'preact';
import { notify } from 'react-notify-toast';
import ReactGA from 'react-ga';
import { microBridge } from '../../micro_bridge';

import style from './style';

const  timeout = 2000;

export default class Footer extends Component {

	state = {
		time: Date.now(),
		interval: 0,
		snoozing: false,
		stopping: false
	};

	//update the current time
	updateTime = () => {
		this.setState({ time: Date.now() });
	};

	showToast(msg) {
		let d = document.getElementById('home');

		if (d !== null) {
			d.classList.add('dim');
		}
		let colors = { background: 'none', text: '#FFFFFF' };
		document.getElementById('toastBox').classList.add('orangeBox');

		setTimeout(() => {
			document.getElementById('toastBox').classList.remove('orangeBox');
		}, timeout + 200);

		notify.show(msg,
			'custom',
			timeout,
			colors);
	}

	waitAndNext() {
		this.setState({ voted: true });

		setTimeout(() => {
			document.getElementById('home').classList.remove('dim');
		}, timeout+100);
	}

	close() {
		ReactGA.event({
			category: 'Navigate',
			action: 'User closed window',
			label: document.URL,
			value: 0
		});
		microBridge.closeWindow();
	}

	cancel = () => {
		this.setState({
			stopping: false
		});
	};

	constructor(props) {
		super(props);

		this.state = {
			voted: false,
			stopping: false
		};
	}

	render(props, state) {

		return (
			<div class={style.footer}>
				{!state.stopping &&
				<div class={style.bots}>
					<div className={style.playsc}>{props.gameMsg}</div>
				</div>
				}
			</div>
		);
	}
}