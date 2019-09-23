import { Component } from 'preact';
import { notify } from 'react-notify-toast';


export default class PFrame extends Component {


	onClick(e) {
		//this.state.click = !this.state.click;
		//this.setState(this.state);
		//this.showToast('Click');
		//this.props.gameClick();
	}

	onBlur(e) {
		this.playGame();
	}
	onCancel(e) {
	}

	showToast(msg) {
		let color = { background: '#EF7D16', text: '#FFFFFF' };
		let timeout = 2000;

		notify.show(msg,
			'custom',
			timeout,
			color);
	}

	playGame() {

		this.removeListeners();
		if (this.props.doGameStarted) {
			this.props.doGameStarted();
		}
	}

	removeListeners() {
		removeEventListener('click', this.onClick);
		removeEventListener('blur', this.onBlur);
		// removeEventListener('mouseover', this.onHover);
		// removeEventListener('mouseout', this.onHoverExit);
		// removeEventListener('touchend', this.onCancel);
		removeEventListener('touchstart', this.onClick);
		// removeEventListener('touchcancel', this.onCancel);
	}

	componentDidUnmount() {
		this.removeListeners();
	}


	constructor(props) {

		super(props);

		this.state = {
			blurred: false,
			currentPlays: 0,
			gameName: ''
		};

		this.onBlur = this.onBlur.bind(this);
		// this.onHover = this.onHover.bind(this);
		// this.onHoverExit = this.onHoverExit.bind(this);
		this.onClick = this.onClick.bind(this);
		//this.onCancel = this.onCancel.bind(this);
		this.playGame = this.playGame.bind(this);

	}

	componentDidMount() {
		addEventListener('click', this.onClick);
		addEventListener('blur', this.onBlur);
		// addEventListener('mouseover', this.onHover);
		// addEventListener('mouseout', this.onHoverExit);
		//addEventListener('touchend', this.onCancel);
		addEventListener('touchstart', this.onClick);
		//addEventListener('touchcancel', this.onCancel);
	}


	render(props) {

		return (
			<div>
				{<iframe {...props} />}
			</div>

		);
	}

}
