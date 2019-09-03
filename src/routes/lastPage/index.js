import { Component } from 'preact';
import {  database } from '../../firebase';
import Survey1 from '../../components/survey1';
import style from './style';

export default class LastPage extends Component {

		state = {
			textvalue: ''

		}
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

	}
	handleChange(event) {
		this.setState({ textvalue: event.target.value });
	}

	handleSubmit(event) {
		event.preventDefault();
		//push itself

		let mailsRef = database.ref('comments/').push();

		mailsRef.set(
			{
				comment: this.state.textvalue,
				date: new Date().toDateString()
			}
		);
	}

	render() {

		return (
			<div id="home" class="home">
				<div>
					<div class="smaller">Thanks for participating in our test<br />Look for more exciting content soon!
					</div>
					{/*<GamesCarousel showHeader={false} showFavorite={false} clickable={false} />*/}
					<br />
					<div class="cent">
						<Survey1 final />
						<br />
					</div>
					<div class={style.buts}>
						<form class={style.commentForm} onSubmit={this.handleSubmit}>
							<label>
								<div>Please share any comments about your experience:</div>
								<textarea className={style.texty} value={this.state.textvalue}
										  onChange={this.handleChange} />
							</label>
							<input class={style.pinkButton} type="submit" value="Submit" />
						</form>
					</div>
				</div>
			</div>
		);
	}


}

//push on form submit
