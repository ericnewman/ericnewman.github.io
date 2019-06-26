import { Component } from 'preact';
import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import style from './style';

import Pframe  from '../../components/pframe';
import PFooter  from '../../components/pfooter';

export default class AFrame extends Component {

	render({ selectedGame }) {
		return (
			<div>
				<Pframe src="http://www.youtube.com/embed/xDMP3i36naA"
					width="100%"
					height="450px"
					name="gameFrame"
					id="gameFrame"
					className={style.framey}
					display="initial"
					position="relative"
				/>
				<PFooter hovering="false" clicked="false" />
			</div>
		);
	}
}
