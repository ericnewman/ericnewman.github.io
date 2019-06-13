import { h, Component } from 'preact';
import { Router } from 'preact-router';
import 'preact-material-components/Card/style.css';
import Card from 'preact-material-components/Card';
import Button from 'preact-material-components/Button';
import style from './style';

export default class Dark extends Component {

	linkTo = path => () => {
	    alert(path);
		//route(path);
	};

	goHome = () => { this.linkTo('/home') };


	render() {
		return (
			<div class={`${style.home}`}>
					<div class={style.hint}>
				          <Button
                                href="/"
                                >
                            FSD
				            </Button>

					</div>
			</div>
		);
	}
}
