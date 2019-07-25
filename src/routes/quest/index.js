import { Component } from 'preact';
import { route } from 'preact-router';

import 'preact-material-components/Card/style.css';
//import 'preact-material-components/Button/style.css';

import Button from 'preact-material-components/Button';
import ParticleEffectButton from 'react-particle-effect-button';
import style from './style';

export default class Quest extends Component {

	_onToggle = () => {
		if (this.state.animating) return;

		this.setState({
			hidden: !this.state.hidden,
			animating: true
		});
	}

	_onAnimationComplete = () => {
		this.setState({
			animating: false
		});
		route('/dash/1');
	}

	render(props,state) {

		const {
			background,
			text,
			buttonStyles,
			buttonOptions = {
				color: '#EF7D15',
				duration: 600,
				easing: 'easeOutQuad',
				speed: 0.2,
				particlesAmountCoefficient: 10,
				oscillationCoefficient: 80
			}
		} = this.props;

		const {
			hidden,
			animating
		} = this.state;

		return (
			<div className="home">
				<div>
					<div>
						<div className="logo" >
							<div className="urup" />
							<div className="beta" />
						</div>
					</div>
					<div className="smaller left">Welcome to the u-R-Up beta.</div>
					<div><p /></div>
					<div>
						<div className="smaller left">You're propmoted to the squad shaping the future of u-R-Up, which is all about finding fun new games.</div><br />
						<div className="smaller left">For 10 days you'll find 1 ro 2 games per day when you unlock.</div><br />
						<div className="smaller left">Play &amp; Rate them to build points and cred.</div><br />
					</div>
					<div className="cent">

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
