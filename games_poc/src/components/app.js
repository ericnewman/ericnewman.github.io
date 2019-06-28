import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Header from './header';
import Home from '../routes/home';
import Profile from '../routes/profile';
import SignIn from '../routes/signin';
import SignOut from '../routes/signout';
import Account from '../routes/account';
import Dash from '../routes/dash';
import Dark from '../routes/dark';
import NotFound from '../routes/404';

export default class App extends Component {



	componentDidMount() {
		console.log('Mounted App...');
	}

	handleRoute = e => {
		setTimeout(() => {
			this.setState({
				currentUrl: e.url
			});
		}, 0);
	};


	render() {
		return (
			<div id="app">
				{this.state.currentUrl !== '/dark' && <Header selectedRoute={this.state.currentUrl} />}
				<Router onChange={this.handleRoute}>
					<Home path="/"  />
					<Profile path="/profile/" user="me" />
					<Profile path="/profile/:user" />
					<Account path="/account" />
					<SignIn path="/signin" />
					<SignOut path="/signout" />
					<Dark path="/dark/" delay="3600" />
					<Dark path="/dark/:delay" />
					<Dash path="/dash" selectedGame="default"  />
					<Dash path="/dash:selectedGame"  />
					<NotFound default />
				</Router>
			</div>
		);
	}
}
