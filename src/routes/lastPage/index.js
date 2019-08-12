import { Component } from 'preact';
import { auth, database } from '../../firebase';
import GamesCarousel from '../../components/gamescarousel';
import Survey1 from '../../components/survey1';
import Logo from '../../components/logo';
import style from './style';

export default class LastPage extends Component {

	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

	}
	handleChange(event) {
		this.setState({value: event.target.value});
	}

	handleSubmit(event) {
		event.preventDefault();
		//push itself


		let mailsRef = database.ref('comments').push();
		mailsRef.set(
			{
				comment: this.state.value
			}
		);
	}

	render() {

		return (
			<div id="home" class="home">
				<Logo />
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
							<textarea class={style.texty} value={this.state.value} onChange={this.handleChange} />
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
