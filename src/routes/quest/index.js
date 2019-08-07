import { Component } from 'preact';
import { route } from 'preact-router';
import Logo from '../../components/logo';

import 'preact-material-components/Card/style.css';
import ParticleEffectButton from 'react-particle-effect-button';

export default class Quest extends Component {

	_onToggle = () => {
		if (this.state.animating) return;

		this.setState({
			hidden: !this.state.hidden,
			animating: true
		});
		localStorage.setItem('seenWelcomeMessage', true);
	}

	_onAnimationComplete = () => {
		this.setState({
			animating: false
		});
		route('/dash/1');
	}

	render(props,state) {

		const {
			// background,
			// text,
			// buttonStyles,
			buttonOptions = {
				color: '#EF7D15',
				duration: 500,
				easing: 'easeOutQuad',
				speed: 0.25,
				particlesAmountCoefficient: 10,
				oscillationCoefficient: 80
			}
		} = this.props;

		const {
			hidden
			// animating
		} = this.state;

		return (
			<div class="home">
				<div>
					<Logo />
					<div class="smaller left">Welcome to the u-R-Up beta.</div>
					<div><p /></div>
					<div>
						<div class="smaller left">You’re now part of the squad shaping the future of u-R-Up, a new way to discover fun new games.</div><br />
						<div class="smaller left">For 10 days you’ll find 1 new game per day when you unlock.</div><br />
						<div class="smaller left">Play &amp; Rate them to build cred as a game connoisseur.</div><br />
						<div class="smaller left">Click below to see how it will work each day.</div>
						<br />
					</div>
					<div class="cent">

						<ParticleEffectButton
							hidden={hidden}
							onComplete={this._onAnimationComplete}
							{...buttonOptions}
						>
							<button
								style={{
									background: '#EF7D15',
									color: '#fff',
									padding: '5px 22px',
									border: '0',
									borderRadius: 25,
									cursor: 'pointer',
									fontSize: '1.6em'
								}}
								onClick={this._onToggle}
							>
								let's rock
							</button>
						</ParticleEffectButton>

					</div>
				</div>
			</div>
		);
	}
}
