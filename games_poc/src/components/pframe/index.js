import { h, Component } from 'preact';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import style from './style';

const OPTS = { passive: false };
const EVENT = {
	get hovering() {
		return true;
	}
};
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
	}


	componentDidMount() {
		addEventListener('click', this.onClick, OPTS);
		addEventListener('blur', this.onBlur, OPTS);
		addEventListener('mouseover', this.onHover, OPTS);
		addEventListener('mouseout', this.onHoverExit, OPTS);
		addEventListener("touchend", this.onClick, false);

	}
	componentWillUnmount() {
		removeEventListener('click', {});
		removeEventListener('touchend', {});
		removeEventListener('blur', {});
		removeEventListener('mouseover', {});
		removeEventListener('mouseout', {});
	}


	onClick(e) {
		// console.log(`onClick`, e);
		// console.log(e.target.id);
		this.state.click = !this.state.click;
		this.setState(this.state);
	}
	onBlur(e) {
		console.log(`onBlur`, e);
		console.log(e.target.document.activeElement.id);
		this.state.blurred = !this.state.blurred;
		this.setState(this.state);
	}
	onHover(e) {
		console.log(`onHover`, e);
		console.log(e);
		this.state.hovering = true;
		this.setState(this.state);
	}
	onHoverExit(e) {
		console.log(`onHover`, e);
		console.log(e);
		this.state.hovering = false;
		this.setState(this.state);
	}


	render (props) {
		return (
			<div>
				<iframe {...this.props} />
			</div>);
	}

}
