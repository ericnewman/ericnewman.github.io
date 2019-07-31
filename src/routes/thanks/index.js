import { Component } from 'preact';
import Notifications from 'react-notify-toast';
import { route } from 'preact-router';

import ParticleEffectButton from 'react-particle-effect-button';

import style from './style';

export default class Thanks extends Component {

	_onToggle = () => {
		if (this.state.animating) return;

		this.setState({
			hidden: !this.state.hidden,
			animating: true
		});
	}
	_onToggle2 = () => {
		if (this.state.animating) return;

		this.setState({
			hidden2: !this.state.hidden2,
			animating2: true
		});
	}

	_onAnimationComplete = () => {
		this.setState({
			animating: false
		});
		route('/step1');
	}
	_onAnimationComplete2 = () => {
		this.setState({
			animating2: false
		});
		document.location.href = 'http://google.com';
	}

	render() {
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
			},
			buttonOptions2 = {
				color: '#073763',
				duration: 600,
				easing: 'easeOutQuad',
				speed: 0.2,
				particlesAmountCoefficient: 10,
				oscillationCoefficient: 80
			}
		} = this.props;

		const {
			hidden,
			animating,
			hidden2,
			animating2
		} = this.state;

		return (
			<div class="home">
				<div>
					<div>
						<div class="logo" >
							<div class="urup" />
							<div class="beta" />
						</div>
					</div>
					<div class="small left">Gotcha.  Looks like you might not be interested in
						checking out our fun new game around discovering new games . . . but we might be wrong.
					</div>
					<div><p /></div>
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
									padding: '5px 52px',
									border: '0',
									borderRadius: 25,
									cursor: 'pointer',
									fontSize: '1.6em'
								}}
								onClick={this._onToggle}
							>
								I'm In
							</button>
						</ParticleEffectButton>
					</div>
					<div class="cent">
						<ParticleEffectButton
							hidden={hidden2}
							onComplete={this._onAnimationComplete2}
							{...buttonOptions2}
						>
							<button
								style={{
									background: '#073763',
									color: '#fff',
									padding: '5px 22px',
									border: '0',
									borderRadius: 25,
									cursor: 'pointer',
									fontSize: '1.6em'
								}}
								onClick={this._onToggle2}
							>
								No Thanks
							</button>
						</ParticleEffectButton>

					</div>

				</div>
				<Notifications options={{ zIndex: 200, top: '180px' }} />
			</div>
		);
	}
}
