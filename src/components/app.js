import { Component } from 'preact';
import { route, Router } from 'preact-router';

import Menu from './menu';

import Dash from '../routes/dash';
import Dark from '../routes/dark';
import LastPage from '../routes/lastpage';
import Outcome from '../routes/outcome';
import Metrics from '../routes/metrics';
import NotFound from '../routes/404';
import Notifications from 'react-notify-toast';
import ReactGA from 'react-ga';
import { auth } from '../firebase';

export default class App extends Component {
	handleRoute = e => {
		if (typeof window !== 'undefined') {
			if(this.state.currentUrl !== e.url) { // Try to prevent possible double firing of pageview.
				ReactGA.pageview(e.url);
				setTimeout(() => {
					this.setState({
						currentUrl: e.url
					});
				}, 100);

			}
		}
	};

	constructor(props) {

		super(props);

		this.games = [];
		this.visitCounted = false;
		this.state = {
			currentUrl: '',

		};
		ReactGA.initialize('UA-102222556-2');

		// ReactGA.pageview('/');
		if (typeof window !== 'undefined') {

			if (localStorage.getItem('explicitOptOut') === true) {
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
