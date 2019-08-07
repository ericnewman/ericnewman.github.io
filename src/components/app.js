import { Component } from 'preact';
import { route, Router } from 'preact-router';

import Menu from './menu';

import Home from '../routes/home';
import Dash from '../routes/dash';
import Dark from '../routes/dark';
import Step1 from '../routes/step1';
import Quest from '../routes/quest';
import Outcome from '../routes/outcome';
import Metrics from '../routes/metrics';
import Thanks from '../routes/thanks';``;
import NotFound from '../routes/404';
import Notifications from 'react-notify-toast';
import ReactGA from 'react-ga';

export default class App extends Component {
	handleRoute = e => {
		if (typeof window !== 'undefined') {
			if (localStorage.getItem('seenWelcomeMessage') === 'false') {
				if (e.url !== '/step1') {
					route('/step1');
				}
			}
			setTimeout(() => {
				ReactGA.pageview(e.url);

				this.setState({
					currentUrl: e.url
				});
			}, 100);
		}
	};

	constructor(props) {

		super(props);

		this.games = [];
		this.visitCounted = false;
		this.state = {
			currentUrl: ''
		};
		ReactGA.initialize('UA-102222556-2');
		// ReactGA.pageview('/');
		if (typeof window !== 'undefined') {
			if (localStorage.getItem('gameEnthusiasm') <= 3) {
				if (document.location.pathname !== '/step1') {
					ReactGA.pageview('/redirected');
					document.location.href = 'https://metropcs.mobi';
				}
			}
		}

	}


	render(state) {
		let showHeader = true;
		let url = this.state.currentUrl;

		if (url) {
			showHeader = (url.indexOf('dark') === -1 && (url !== '/'));
			if (typeof window !== 'undefined' && window.MP) { // Do not show the header in-app...
				showHeader = false;
			}
		}

		return (
			<div id="app">
				<Notifications options={{ zIndex: 200, top: '180px', wrapperId: 'toastBox' }} />
				{showHeader &&
					<Menu selectedRoute={state.currentUrl} />}

				<Router onChange={this.handleRoute}>
					<Home path="/" />
					<Dark path="/dark/" delay="3600" />
					<Dark path="/dark/:delay" />
					<Dash path="/dash" selectedGame="1" />
					<Dash path="/dash/:selectedGame" />
					<Quest path="/quest" />
					<Step1 path="/step1" />
					<Thanks path="/thanks" />
					<Metrics path="/metrics" />
					<NotFound default />
					<Outcome path="/outcome" />
				</Router>
			</div>
		);
	}
}
