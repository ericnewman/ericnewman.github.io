import { Component } from 'preact';
import { Router } from 'preact-router';
import Menu from './menu';
import Game from '../routes/game';
import LastPage from '../routes/survey';
import NotFound from '../routes/404';
import Notifications from 'react-notify-toast';
import ReactGA from 'react-ga';

import gamesList from '../gamesList';

export default class App extends Component {

	handleRoute = e => {

		if (typeof window !== 'undefined') {

			if (window.sessionTimer) {
				// Clear any residual session left open somehow.
				clearTimeout(window.sessionTimer);
				window.sessionTimer = null;
			}
			this.registerPageView(e.url);

			if (this.state.currentUrl !== e.url) { // Try to prevent possible double firing of pageview.

				setTimeout(() => {
					this.setState({
						currentUrl: e.url
					});
				}, 0);
			}
		}
	};

	registerPageView(page) {
		ReactGA.pageview(page);
	}

	constructor(props) {

		super(props);

		this.visitCounted = false;

		this.state = {
			currentUrl: (typeof window !== 'undefined') ? document.location.pathname : ':'
		};

		ReactGA.initialize('UA-102222556-2');

		if (typeof window !== 'undefined') {
			if (document.location.pathname.indexOf('/optin') > 0) {
				localStorage.setItem('explicitOptOut',  'false');
			}

			if (localStorage.getItem('explicitOptOut') === 'true') {
				ReactGA.pageview('/redirected-by-opt-out');
				setTimeout(() => {
					document.location.href = 'https://metropcs.mobi';
				}, 25);
			}
		}
	}

	render(props, state) {
		let showHeader = true,
			url = this.state.currentUrl,
			today = new Date(),
			gameNum = props.selectedGame || 1 + String(today.getDate()) % (gamesList.length - 1);

		if (url) {
			// showHeader = (url.indexOf('dark') === -1);
			if (typeof window !== 'undefined' && window.MP) { // Do not show the header in-app...
				showHeader = false;
			}
		}

		return (
			<div id="app">
				<Notifications options={{ zIndex: 200, top: '180px', wrapperId: 'toastBox' }} />
				{showHeader && <Menu selectedRoute={state.currentUrl} />}

				<Router onChange={this.handleRoute}>
					<Game path="/"  selectedGame={gameNum} />
					<Game path="/game" selectedGame={gameNum} />
					<Game path="/game/:selectedGame" selectedGame={gameNum} />
					<LastPage path="/survey" />
					<NotFound default />
				</Router>
			</div>
		);
	}
}
