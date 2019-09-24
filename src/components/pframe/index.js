import { Component } from 'preact';
import { notify } from 'react-notify-toast';


export default class PFrame extends Component {


	onClick(e) {
	}

	onBlur(e) {
		this.playGame();
	}

	onCancel(e) {
	}

	showToast(msg) {
		let color = { background: '#EF7D16', text: '#FFFFFF' };

		notify.show(msg,
			'custom',
			2000,
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
		removeEventListener('touchstart', this.onClick);
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
		this.onClick = this.onClick.bind(this);
		this.playGame = this.playGame.bind(this);

	}

	componentDidMount() {
		addEventListener('click', this.onClick);
		addEventListener('blur', this.onBlur);
		addEventListener('touchstart', this.onClick);
	}


	render(props) {

		return (
			<div>
				{<iframe {...props} />}
			</div>

		);
	}

}
