import { Component } from 'preact';
import { route } from 'preact-router';
import StarRatingComponent from 'react-star-rating-component';

import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import Button from 'preact-material-components/Button';
import LayoutGrid from 'preact-material-components/LayoutGrid';
import 'preact-material-components/LayoutGrid/style.css';

import style from './style';


export default class PlayFooter extends Component {

	state = {
		showSnooze: false,
		showIcons: false,
		showCheck: false
	}


	render(props, state) {

		return (
			<Card class={style.footer}>
				<div className={style.cardBody}>
					{state.showSnooze && <Button
						raised ripple
						onClick={props.snoozer}
					                     >
						Snooze
					</Button>}
					<StarRatingComponent

						name="rate2"
						editing={false}
						renderStarIcon={() => <span></span>}
						starCount={10}
						value={8}

					/>
					<div className="mdc-typography--title">Play one of the previous games:</div>
					<LayoutGrid>
						<LayoutGrid.Inner>
							<LayoutGrid.Cell cols="1">
								<Button
									raised ripple
									onClick={() => props.snoozer()}
								>
									Snooze
								</Button>
							</LayoutGrid.Cell>
							<LayoutGrid.Cell cols="2">
								<Button
									raised ripple
									onClick={() => props.leaderboard()}
								>
									Leaders
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
// name={String} /* name of the radio input, it is required EE*/
// value={Number} /* number of selected icon (`0` - none, `1` - first) */
// starCount={Number} /* number of icons in rating, default `5` */
// onStarClick={Function(nextValue, prevValue, name)} /* on icon click handler */
// onStarHover={Function(nextValue, prevValue, name)} /* on icon hover handler */
// onStarHoverOut={Function(nextValue, prevValue, name)} /* on icon hover out handler */
// renderStarIcon={Function(nextValue, prevValue, name)} /* it should return string or react component */
// renderStarIconHalf={Function(nextValue, prevValue, name)} /* it should return string or react component */
// starColor={String} /* color of selected icons, default `#ffb400` */
// emptyStarColor={String} /* color of non-selected icons, default `#333` */
// editing={Boolean} /* is component available for editing, default `true` */
