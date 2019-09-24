import { Component } from 'preact';
import Survey1 from '../../components/survey';
import style from './style';
import ReactGA from 'react-ga';
import { microBridge } from '../../micro_bridge';
import Button from 'preact-material-components/Button';

export default class LastPage extends Component {

	close() {
		ReactGA.event({
			category: 'Navigate',
			action: 'User closed window on survey',
			label: document.URL,
			value: 0
		});
		microBridge.closeWindow();
	}

	handleChange(event) {
		if (event.target.value) {
			this.setState({ textvalue: event.target.value });
		}
	}

	handleSubmit(event) {
		this.setState({ submitted: true });

		event.preventDefault();
		//push itself

		// let mailsRef = database.ref('comments/').push();
		//
		// mailsRef.set(
		// 	{
		// 		comment: this.state.textvalue,
		// 		date: new Date().toDateString()
		// 	}
		// );
	}

	constructor(props) {
		super(props);

		this.state = {
			textvalue: '',
			submitted: false

		};


	}
	componentDidMount() {
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

	}

	render(props, state) {
		return (
			<div id="home" class="home">
				<div>
					<div class="smaller">Thanks for participating in our test<br />Look for more exciting content soon!
					</div>
					<br />
					<div class="cent">
						<Survey1 final noexit />
						<br />
					</div>
					{!state.submitted && <div class={style.buts}>
						<form class={style.commentForm} onSubmit={this.handleSubmit}>
							<label>
								<div>Please share any comments about your experience:</div>
								<textarea className={style.texty} value={this.state.textvalue}
									onChange={this.handleChange}
								/>
							</label>
							<input class={style.pinkButton} type="submit" value="Submit" />
						</form>
					</div> }
					{state.submitted &&
					<div className={style.buts}>
						<div className="smaller">Thanks for Your feedback!!!!</div>
						<Button class={style.dkBlueButton} onClick={this.close}>
							close
						</Button>
					</div>
					}
				</div>
			</div>
		);
	}


}

//push on form submit
