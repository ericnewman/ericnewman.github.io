import { Component } from 'preact';
import { route } from 'preact-router';

import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import Button from 'preact-material-components/Button';
import LayoutGrid from 'preact-material-components/LayoutGrid';
import 'preact-material-components/LayoutGrid/style.css';

import style from './style';
import { auth, googleAuthProvider } from '../../firebase';


export default class PFooter extends Component {

	render(props) {

		return (
			<Card class={style.footer}>
				<div className={style.cardBody}>
					<div className="mdc-typography--title">Name: {props.name}</div>
					<LayoutGrid>
						<LayoutGrid.Inner>
							<LayoutGrid.Cell cols="1">
								<Button
									raised ripple
									onClick={() => props.snoozer(props.snooze)}
								>
									Snooze
								</Button>
							</LayoutGrid.Cell>
							<LayoutGrid.Cell cols="2">
								<Button
									raised ripple
									onClick={() => auth.signInWithRedirect(googleAuthProvider)}
								>
									Another?
								</Button>
							</LayoutGrid.Cell>
							<LayoutGrid.Cell cols="1">
								<Button
									raised ripple
									onClick={() => route('/')}
								>
								Home
								</Button>
							</LayoutGrid.Cell>
						</LayoutGrid.Inner>
					</LayoutGrid>
				</div>
			</Card>);
	}
}
