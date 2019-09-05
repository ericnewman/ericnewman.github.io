import { Component } from 'preact';
import { Router } from 'preact-router';

import Menu from './menu';

import Dash from '../routes/dash';
import Dark from '../routes/dark';
import LastPage from '../routes/lastpage';
import Outcome from '../routes/outcome';
import Metrics from '../routes/metrics';
import NotFound from '../routes/404';
import Notifications from 'react-notify-toast';
import ReactGA from 'react-ga';
import { auth, database } from '../firebase';

export default class App extends Component {
	handleRoute = e => {
		if (window.sessionTimer) {
			// Clear any residual session left open somehow.
			clearTimeout(window.sessionTimer);
			window.sessionTimer = null;

		}

		if (typeof window !== 'undefined') {
			if (this.state.currentUrl !== e.url) { // Try to prevent possible double firing of pageview.
				ReactGA.pageview(e.url);
				this.registerPageView(e.url);

				setTimeout(() => {
					this.setState({
						currentUrl: e.url
					});
				}, 100);

			}
		}
	};

	registerPageView(page) {
		let ref = database.ref('pageview/' + page);
		ref.transaction((count) => (count) || 1) + 1;
		let opt = localStorage.getItem('explicitOptOut') !== 'true';
		if (opt) {
			let ref = database.ref('pageview/opted In');
			ref.transaction((count) => (count) || 1) + 1;
		}
		else {
			let ref = database.ref('pageview/opted Out');
			ref.transaction((count) => (count) || 1) + 1;
		}

	}

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

			if (localStorage.getItem('explicitOptOut') === 'true') {
				auth.signOut();
				ReactGA.pageview('/redirected-opt-out');
				document.location.href = 'https://metropcs.mobi';
			}
		}

	}


	render(state) {
		let showHeader = true;
		let url = this.state.currentUrl;

		if (url) {
			showHeader = (url.indexOf('dark') === -1 );
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
					<Dash path="/" selectedGame="1" />
					<Dash path="/dash" selectedGame="1" />
					<Dash path="/dash/:selectedGame" />
					<LastPage path="/lastpage" />
					<Metrics path="/metrics" />
					<NotFound default />
					<Outcome path="/outcome" />
				</Router>
			</div>
		);
	}
}
