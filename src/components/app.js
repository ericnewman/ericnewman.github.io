import { Component } from 'preact';
import { Router } from 'preact-router';

import Header from './header';

import AlmostHere from '../routes/almosthere';
import Home from '../routes/home';
import MoreInfo from '../routes/moreinfo';
import Profile from '../routes/profile';
import SignIn from '../routes/signin';
import SignOut from '../routes/signout';
import Account from '../routes/account';
import Dash from '../routes/dash';
import Dark from '../routes/dark';
import Boards from '../routes/boards';
import NotFound from '../routes/404';

export default class App extends Component {

	handleRoute = e => {
		setTimeout(() => {
			this.setState({
				currentUrl: e.url
			});
		}, 0);
	};

	componentDidMount() {
		console.log('Mounted App...');
	}

	render() {
		return (
			<div id="app">
				{this.state.currentUrl !== '/dark' && <Header selectedRoute={this.state.currentUrl} />}
				<Router onChange={this.handleRoute}>
					<Home path="/" />
					<Profile path="/profile/" user="me" />
					<Profile path="/profile/:user" />
					<Account path="/account" />
					<SignIn path="/signin" />
					<SignOut path="/signout" />
					<Dark path="/dark/" delay="3600" />
					<Dark path="/dark/:delay" />
					<Dash path="/dash" selectedGame="default" />
					<Dash path="/dash:selectedGame" />
					<AlmostHere path="/almosthere" />
					<MoreInfo path="/moreinfo" />
					<Boards path="/boards" />
					<NotFound default />
				</Router>
			</div>
		);
	}
}
