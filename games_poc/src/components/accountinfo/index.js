import { h, Component } from 'preact';
import style from './style';

export default class AccountInfo extends Component {

	render () {
	    let user = this.props.user;
		if (!user) return (<div> No User Logged In </div>);
		return  (
		    <div class={style.account}>
				<img src={this.props.user.photoURL} />
				<div>{this.props.user.displayName}</div>
				<div>{this.props.user.email}</div>
				<div class={style.dates}>Created:{this.props.user.metadata.creationTime}</div>
				<div class={style.dates}>Last Log-in: {this.props.user.metadata.lastSignInTime}</div>
		     </div>);
	}
}
