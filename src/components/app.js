import { Component } from 'preact';
import { Router } from 'preact-router';
import Menu from './menu';
import Dash from '../routes/dash';
import Dark from '../../unused/dark';
import LastPage from '../routes/lastpage';
import NotFound from '../routes/404';
import Notifications from 'react-notify-toast';
import ReactGA from 'react-ga';

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

		this.games = [];
		this.visitCounted = false;

		this.state = {
			currentUrl: (typeof window !== 'undefined') ? document.location.pathname : ':'
		};


		ReactGA.initialize('UA-102222556-2');

		if (typeof window !== 'undefined') {
			if (localStorage.getItem('explicitOptOut') === 'true') {
				ReactGA.pageview('/redirected-opt-out');
				setTimeout(() => {
					document.location.href = 'https://metropcs.mobi';
				}, 25);
			}
		}
	}

	render(state) {
		let showHeader = true;
		let url = this.state.currentUrl;

		if (url) {
			showHeader = (url.indexOf('dark') === -1);
			if (typeof window !== 'undefined' && window.MP) { // Do not show the header in-app...
				showHeader = false;
			}
		}

		return (
			<div id="app">
				<Notifications options={{ zIndex: 200, top: '180px', wrapperId: 'toastBox' }} />
				{showHeader && <Menu selectedRoute={state.currentUrl} />}

				<Router onChange={this.handleRoute}>
					<Dark path="/dark/" delay="3600" />
					<Dark path="/dark/:delay" />
					<Dash path="/"  selectedGame="1" />
					<Dash path="/dash" selectedGame="1" />
					<Dash path="/dash/:selectedGame" />
					<LastPage path="/survey" />
					<NotFound default />
				</Router>
			</div>
		);
	}
}
