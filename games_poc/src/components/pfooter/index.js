import { Component } from 'preact';
import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import style from './style';


export default class PFooter extends Component {

	render(props) {
		return (
			<Card>
				Properties: {props}
			</Card>
		);
	}
}
