import { h, Component } from 'preact';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import { notify } from 'react-notify-toast';

import style from './style';

const OPTS = { passive: false, capture: true };

export default class PFrame extends Component {


	constructor () {
		super();
		this.clicked = false;
		this.state.blurred = false;
		this.state.hovering = false,
		this.onBlur = this.onBlur.bind(this);
		this.onHover = this.onHover.bind(this);
		this.onHoverExit = this.onHoverExit.bind(this);
		this.onClick = this.onClick.bind(this);
		this.onCancel = this.onCancel.bind(this);

	}


	componentDidMount() {
		addEventListener('click', this.onClick);
		addEventListener('blur', this.onBlur);
		addEventListener('mouseover', this.onHover);
		addEventListener('mouseout', this.onHoverExit);
		addEventListener("touchend", this.onCancel);
		addEventListener("touchstart", this.onClick);
		addEventListener("touchcancel", this.onCancel);
	}
	componentWillUnmount() {
		this.componentDidUnmount();
	}
	componentDidUnmount() {
		removeEventListener('click', this.onClick);
		removeEventListener('blur', this.onBlur);
		removeEventListener('mouseover', this.onHover);
		removeEventListener('mouseout', this.onHoverExit);
		removeEventListener("touchend", this.onCancel);
		removeEventListener("touchstart", this.onClick);
		removeEventListener("touchcancel", this.onCancel);
	}


	onClick(e) {
		this.state.click = !this.state.click;
		this.setState(this.state);
		this.showToast("Click");

	}
	onBlur(e) {
		// console.log(e.target.document.activeElement.id);
		this.state.blurred = !this.state.blurred;
		this.setState(this.state);
		this.showToast("Game Start Detected");
	}
	onHover(e) {
		this.showToast("Hover");
		this.state.hovering = true;
		this.setState(this.state);
	}
	onHoverExit(e) {
		this.showToast("HoverExit");
		this.state.hovering = false;
		this.setState(this.state);
	}
	onCancel(e) {
		this.showToast("onCancel");
	}
	showToast(msg) {
		let color = { background: '#F83', text: '#FFFFFF' };
		let timeout = 2000;

		notify.show(msg,
			'custom',
			timeout,
			color);
	}


	render (props) {
		return (
			<div>
				<iframe {...this.props} class={style.framey} />
			</div>);
	}

}
