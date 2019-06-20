import { h, Component } from 'preact';
import 'preact-material-components/Card/style.css';
import Button from 'preact-material-components/Button';
import style from './style';

export default class Dark extends Component {


	render() {
		return (
			<div class={`${style.home}`}>
				<div class={style.hint}>
				          <Button href="/" >
                            FSD
				            </Button>
				</div>
			</div>
		);
	}
}
