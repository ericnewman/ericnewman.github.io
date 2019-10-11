import { Component } from 'preact';
import style from './style';
import ReactGA from 'react-ga';
import { route } from 'preact-router';

import ParticleEffectButton from 'react-particle-effect-button';

export default class SignUpButton extends Component {

	_onToggle = () => {
		if (this.state.animating) return;

		this.setState({
			hidden: !this.state.hidden,
			animating: true
		});
		ReactGA.event({
			category: 'User Opted In',
			action: 'User Opted In',
			label: this.props.scenario,
			nonInteraction: false
		});

		localStorage.setItem('explicitOptIn', 'true');
		route('/game');
	}

	_onAnimationComplete = () => {
		this.setState({
			animating: false
		});
		route('/game');
	}

	constructor(props) {
		super(props);

		props.labels =  [
			'I\'m In!',
			'Join Now',
			'Start Playing',
			'Let\'s Go!',
			'YES, I want games'
		];

		props.buttonOptions = {
			color: '#EF7D15',
			duration: 600,
			easing: 'easeOutQuad',
			speed: 0.2,
			particlesAmountCoefficient: 10,
			oscillationCoefficient: 80
		};

		this.state = {
			hidden: false,
			animating: false
		};

	}

	render(props, state) {
		return (
			<div class={style.signup}>
				{props.labels[props.experiment] &&
				<ParticleEffectButton
					hidden={state.hidden}
					onComplete={this._onAnimationComplete}
					{...props.buttonOptions}
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
						{props.labels[props.experiment]}
					</button>
				</ParticleEffectButton>
				}
			</div>
		);
	}
}
