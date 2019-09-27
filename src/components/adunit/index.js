import { Component } from 'preact';
import { Bling as Gpt } from 'react-gpt';
import style from './style';


export default class AdUnit extends Component {

	constructor(props) {
		super(props);
		this.props = props;
	}

	render (props) {
		return (<div className={style.adfooter}>
			<div id="ad1">
				<Gpt
					adUnitPath={props.adPath}
					sizeMapping={[{ viewport: [0, 0], slot: [320, 50] }]}
				/>
			</div>
		</div>);

	}
}