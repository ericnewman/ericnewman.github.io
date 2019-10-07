import { Component } from 'preact';
import { route } from 'preact-router';
import TopAppBar from 'preact-material-components/TopAppBar';
import Drawer from 'preact-material-components/Drawer';
import List from 'preact-material-components/List';
import ReactGA from 'react-ga';

import 'preact-material-components/Drawer/style.css';
import 'preact-material-components/List/style.css';
import 'preact-material-components/TopAppBar/style.css';

import style from './style.scss';

export default class Menu extends Component {

	closeDrawer = () => (this.drawer.MDComponent.open = false);
	openDrawer = () => (this.drawer.MDComponent.open = true);

	drawerRef = drawer => (this.drawer = drawer);
	dialogRef = dialog => (this.dialog = dialog);

	linkTo = path => () => {
		this.closeDrawer();
		route(path);
	};

	goHome = this.linkTo('/');
	goToDash1 = this.linkTo('/game/1');
	goToDash2 = this.linkTo('/game/2');
	goToDash3 = this.linkTo('/game/3');
	goToDash4 = this.linkTo('/game/4');
	goToDash5 = this.linkTo('/game/5');
	goToDash6 = this.linkTo('/game/6');
	goToDash7 = this.linkTo('/game/7');
	goToSurvey = this.linkTo('/survey');
	goToOptIn = this.linkTo('/optin');


	optOut = () => {
		localStorage.setItem('explicitOptOut',  'true');
		ReactGA.event({
			category: 'User Opt-Out',
			action: 'User Opt-Out',
			nonInteraction: false
		});
		this.closeDrawer();
		document.location.href = 'https://metropcs.mobi';
	};

	componentWillMount() {
		if (typeof window !== 'undefined') {
			this.state = {
				currentGame: localStorage.getItem('currentGameID') || '1',
				highestGame: localStorage.getItem('highestGameID') || '1',
				isAdmin: localStorage.getItem('isAdmin') || false
			};
		}
		else {
			this.state = {
				currentGame: '1',
				highestGame: '1'
			};
		}
	}

	render(props, state) {
		if (!props.selectedRoute) {
			props.selectedRoute = '/game';
		}

		return (
			<div>
				<TopAppBar class="topappbar">
					<TopAppBar.Row>
						<TopAppBar.Section align-start>
							<TopAppBar.Icon menu onClick={this.openDrawer}>
								menu
							</TopAppBar.Icon>
							<TopAppBar.Title>
								<div class={style.logo} />
							</TopAppBar.Title>
						</TopAppBar.Section>
					</TopAppBar.Row>
				</TopAppBar>
				<Drawer modal ref={this.drawerRef}>
					<Drawer.DrawerContent>
						<Drawer.DrawerItem selected={props.selectedRoute === '/step1' || props.selectedRoute === '/'}
							onClick={this.goHome}
						>
							<List.ItemGraphic>home</List.ItemGraphic>
							Home
						</Drawer.DrawerItem>
						<Drawer.DrawerItem selected={props.selectedRoute === '/game/1'} onClick={this.goToDash1}>
							<List.ItemGraphic>web_asset</List.ItemGraphic>
							Piggy Night
						</Drawer.DrawerItem>
						<Drawer.DrawerItem selected={props.selectedRoute === '/game/2'} onClick={this.goToDash2}>
							<List.ItemGraphic>web_asset</List.ItemGraphic>
							Crazy Balls
						</Drawer.DrawerItem>
						<Drawer.DrawerItem selected={props.selectedRoute === '/game/3'} onClick={this.goToDash3}>
							<List.ItemGraphic>web_asset</List.ItemGraphic>
							Balloon
						</Drawer.DrawerItem>
						<Drawer.DrawerItem selected={props.selectedRoute === '/game/4'} onClick={this.goToDash4}>
							<List.ItemGraphic>web_asset</List.ItemGraphic>
							Ninja Action
						</Drawer.DrawerItem>
						<Drawer.DrawerItem selected={props.selectedRoute === '/game/5'} onClick={this.goToDash5}>
							<List.ItemGraphic>web_asset</List.ItemGraphic>
							Monsters Up
						</Drawer.DrawerItem>
						<Drawer.DrawerItem selected={props.selectedRoute === '/game/6'} onClick={this.goToDash6}>
							<List.ItemGraphic>web_asset</List.ItemGraphic>
							Rise Up
						</Drawer.DrawerItem>
						<Drawer.DrawerItem selected={props.selectedRoute === '/game/7'} onClick={this.goToDash7}>
							<List.ItemGraphic>web_asset</List.ItemGraphic>
							Basketball
						</Drawer.DrawerItem>
						<Drawer.DrawerItem selected={props.selectedRoute === '/optin'} onClick={this.goToOptIn}>
							<List.ItemGraphic>explore</List.ItemGraphic>
							Opt In
						</Drawer.DrawerItem>
						<Drawer.DrawerItem selected={props.selectedRoute === '/survey'} onClick={this.goToSurvey}>
							<List.ItemGraphic>explore</List.ItemGraphic>
							Survey
						</Drawer.DrawerItem>
						<Drawer.DrawerItem onClick={this.optOut}>
							<List.ItemGraphic>build</List.ItemGraphic>
							Stop Getting Games
						</Drawer.DrawerItem>
					</Drawer.DrawerContent>
				</Drawer>
			</div>
		);
	}
}
