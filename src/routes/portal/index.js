import { Component } from 'preact';
import { Container, Row, Col } from 'reactstrap';
import style from './style.scss';
import Img from 'react-image';
import { route } from 'preact-router';

export default class Portal extends Component {


	gotoPacman() {

		document.location.href = 'https://ericnewman.github.io/pacman-pwa/index.html';
	}
	linkTo = path => () => {
		route(path);
	};

	goHome = this.linkTo('/');
	goPuzzle () {
		document.location.href = 'http://whitelabel.marketjs.com/category/puzzle?preview=5033219829268480';
	}
	goFamily () {
		document.location.href = 'http://whitelabel.marketjs.com/category/family?preview=5033219829268480';
	}

	constructor(props) {
		super(props);

		this.state = {
			textvalue: '',
			submitted: false
		};
	}
	render(props, state) {
		return (
			<div id="home" class={style.home}>
				<div>
					<div class={style.home}>Select one of the exciting game categories below
					</div>
					<br />
				</div>
				<Container>
					<Row>
						<Col xs="6" className={style.box} onclick={this.goHome}>
							<div class={style.tile}>
								<div class={style.tiletitle}>Quickies</div>
								<Img src={'../../assets/img/crazyballs.png'} class={style.image} />
							</div>
						</Col>
						<Col xs="6" className={style.box} onclick={this.gotoPacman}>
							<div className={style.tile}>
								<div className={style.tiletitle}>Arcade</div>
								<Img src={'../../assets/img/frogger.gif'} class={style.image} />

							</div>
						</Col>
					</Row>
					<Row>
						<Col xs="6" className={style.box} onclick={this.goPuzzle}>
							<div className={style.tile}>
								<div className={style.tiletitle}>Puzzles</div>
								<Img src={'../../assets/img/puzzle.png'} class={style.image} />

							</div>
						</Col>
						<Col xs="6" className={style.box}>
							<div className={style.tile}>
								<div className={style.tiletitle}>Hidden Objects</div>
								<Img src={'../../assets/img/hidden.jpg'} class={style.image} />

							</div>
						</Col>
					</Row>
					<Row>
						<Col xs="6" className={style.box}>
							<div className={style.tile}>
								<div className={style.tiletitle}>Cards</div>
								<Img src={'../../assets/img/cards.png'} class={style.image} />

							</div>
						</Col>
						<Col xs="6" className={style.box}>
							<div className={style.tile}>
								<div className={style.tiletitle}>Casino</div>
								<Img src={'../../assets/img/casino.jpg'} class={style.image} />

							</div>
						</Col>
					</Row>
					<Row>
						<Col xs="6" className={style.box}>
							<div className={style.tile}>
								<div className={style.tiletitle}>Family Games</div>
								<Img src={'../../assets/img/casual-games.jpg'} class={style.image} />

							</div>
						</Col>
						<Col xs="6" className={style.box}>
							<div className={style.tile}>
								<div className={style.tiletitle}>Brain Puzzles</div>
								<Img src={'../../assets/img/brain.jpeg'} class={style.image} />

							</div>
						</Col>
					</Row>
					{/*<Row>*/}
					{/*	<Col xs="2">.col-1</Col>*/}
					{/*	<Col xs="2">.col-1</Col>*/}
					{/*</Row>*/}
					{/*<Row>*/}
					{/*	<Col xs="6">.col-6</Col>*/}
					{/*	<Col xs="6">.col-6</Col>*/}
					{/*</Row>*/}
					{/*<Row>*/}
					{/*	<Col xs="6" sm="4">.col-6 .col-sm-4</Col>*/}
					{/*	<Col xs="6" sm="4">.col-6 .col-sm-4</Col>*/}
					{/*	<Col sm="4">.col-sm-4</Col>*/}
					{/*</Row>*/}
					{/*<Row>*/}
					{/*	<Col sm={{ size: 6, order: 2, offset: 1 }}>.col-sm-6 .order-sm-2 .offset-sm-1</Col>*/}
					{/*</Row>*/}
					{/*<Row>*/}
					{/*	<Col sm="12" md={{ size: 6, offset: 3 }}>.col-sm-12 .col-md-6 .offset-md-3</Col>*/}
					{/*</Row>*/}
					{/*<Row>*/}
					{/*	<Col sm={{ size: 'auto', offset: 1 }}>.col-sm-auto .offset-sm-1</Col>*/}
					{/*	<Col sm={{ size: 'auto', offset: 1 }}>.col-sm-auto .offset-sm-1</Col>*/}
					{/*</Row>*/}
				</Container>
			</div>
		);
	}
}
