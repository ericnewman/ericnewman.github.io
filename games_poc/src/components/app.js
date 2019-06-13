import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Header from './header';
import Home from '../routes/home';
import Profile from '../routes/profile';
import SignUp from '../routes/signup';
import SignIn from '../routes/signin';
import SignOut from '../routes/signout';
import Account from '../routes/account';
import Dark from '../routes/dark';
import PasswordChange from '../routes/passwordchange';
import PasswordForgot from '../routes/passwordforgot';
import NotFound from '../routes/404';
import { auth, googleAuthProvider } from '../firebase';
import LogRocket from 'logrocket';

export default class App extends Component {
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */

    constructor() {
        super();
        LogRocket.init('qzrlzf/gamestest');

    }
	handleRoute = e => {
		this.setState({
			currentUrl: e.url
		});
	};

	render() {
		return (
			<div id="app">
				{this.state.currentUrl != "/dark" && <Header selectedRoute={this.state.currentUrl} />}
				<Router onChange={this.handleRoute}>
					<Home path="/" />
					<Profile path="/profile/" user="me" />
					<Profile path="/profile/:user" />
					<Account path="/account" />
					<SignUp path="/signup" />
					<SignIn path="/signin" />
					<SignOut path="/signout" />
					<PasswordChange path="/passwordchange" />
					<PasswordForgot path="/passwordforgot" />
					<Dark path="/dark" />
					<NotFound default />
				</Router>
			</div>
		);
	}
}
