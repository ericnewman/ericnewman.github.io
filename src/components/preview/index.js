import { Component } from 'preact';
import Progress from 'preact-progress';
import style from './style.scss';
import { route } from 'preact-router';

export default class Preview extends Component {


	onChange = (ctx, val) => {

		switch (val) {
			case 100:
			case 99:
				this.props.message = 'You\'re playing one of our FREE daily fun games';
				this.props.color = '#0FF';
				break;
			case 45:
				this.props.color = '#3FF';
				this.props.message = 'Sign Up, and get free games every day';
				break;
			case 20:
				this.props.color = '#6FF';
				this.props.message = 'No apps to install - it\'s easy!';

				break;
			case 1:
			case 0:
				this.props.message = 'Sorry, Preview Over...';
				this.onComplete();
				break;
		}
	};

	onComplete = () => {

		this.setState({
			complete: true
		});


		if (this.timer) {
			clearInterval(this.timer);
			this.timer = null;
			if (this.props.afterAction) {
				this.props.afterAction();
			}
			route('/optin');
		}
	};

	constructor(props) {
		super(props);

		let optedIn = false;


		if (typeof window !== 'undefined') {
			optedIn = localStorage.getItem('explicitOptIn') === 'true';
		}

		let showPreview =  !optedIn;

		this.state = {
			progress: 1,
			complete: optedIn,
			showPreview
		};


		this.onChange.bind(this);
		this.onComplete.bind(this);

	}

	componentDidMount() {

		if ((typeof window !== 'undefined') && this.state.showPreview) {

			this.timer = setInterval(() => {
				this.setState({
					progress: (this.state.progress + 1) % 100
				});
			}, 100); //100
		}
	}

	componentWillUnmount() {
	// stop when not renderable
		clearInterval(this.timer);
	}

	render(props, state) {

		return (
			<div>
				{!state.complete &&
				<div className={style.loader}>
					<div className={style.warn}>
						{props.message}
					</div>

					<Progress id="loader"
						class={style.loader}
						value={100 - this.state.progress}
						height="30px"
						color={props.color}
						onChange={this.onChange}
						onComplete={this.onComplete}
					/>
				</div>
				}
			</div>
		);
	}
}