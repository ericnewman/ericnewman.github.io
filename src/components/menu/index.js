import { h, Component } from 'preact';
import { route } from 'preact-router';
import TopAppBar from 'preact-material-components/TopAppBar';
import Drawer from 'preact-material-components/Drawer';
import List from 'preact-material-components/List';
import 'preact-material-components/Switch/style.css';
import 'preact-material-components/Dialog/style.css';
import 'preact-material-components/Drawer/style.css';
import 'preact-material-components/List/style.css';
import 'preact-material-components/TopAppBar/style.css';
import style from './style';
import { auth, database } from '../../firebase';

export default class Menu extends Component {


	closeDrawer() {
		this.drawer.MDComponent.open = false;
		//this.state.darkThemeEnabled = false;
	}

	openDrawer = () => (this.drawer.MDComponent.open = true);
	openSettings = () => this.dialog.MDComponent.show();

	drawerRef = drawer => (this.drawer = drawer);
	dialogRef = dialog => (this.dialog = dialog);

	linkTo = path => () => {
		this.closeDrawer();
		route(path);
	};

	goHome     = this.linkTo('/');
	// goToStep1  = this.linkTo('/step1');
	goToDash0  = this.linkTo('/dash/0');
	goToDash1  = this.linkTo('/dash/1');
	goToDash2  = this.linkTo('/dash/2');
	goToDash3  = this.linkTo('/dash/3');
	goToDash4  = this.linkTo('/dash/4');
	goToDash5  = this.linkTo('/dash/5');
	goToDash6  = this.linkTo('/dash/6');
	goToDash7  = this.linkTo('/dash/7');
	goToDash8  = this.linkTo('/dash/8');
	goToDash9  = this.linkTo('/dash/9');
	goToDash10 = this.linkTo('/dash/10');
	goToDash11 = this.linkTo('/dash/11');
	goToDash12 = this.linkTo('/dash/12');
	goToDash13 = this.linkTo('/dash/13');
	goToDash14 = this.linkTo('/dash/14');
	goToDash15 = this.linkTo('/dash/15');
	goToOutcome = this.linkTo('/outcome');
	goToMetrics = this.linkTo('/metrics');
	goToLastPage = this.linkTo('/lastpage');

	goToStep1 = () => {
		localStorage.setItem('seenWelcomeMessage', false);
		localStorage.setItem('currentGameID', '1');
		localStorage.setItem('highestGameID', '1');
		localStorage.setItem('explicitOptOut', '99');
		localStorage.setItem('fastStarts', ',');
		localStorage.setItem('previouslyRated', ',');
		this.closeDrawer();
		route('/step1');

	}

	showAllGames = () => {
		localStorage.setItem('seenWelcomeMessage', false);
		localStorage.setItem('currentGameID', '1');
		localStorage.setItem('highestGameID', '12');

		this.closeDrawer();
		 let a = document.location.href;
		 document.location.href = a;
	}
	resetSnoozes = () => {
		let ref = database.ref('users/' + auth.currentUser.uid + '/totalSnoozes');
		ref.transaction((totalSnooze) => 0);
		this.closeDrawer();
	}

	componentWillMount() {
		if (typeof window !== 'undefined') {
			this.state = {
				currentGame: localStorage.getItem('currentGameID') || '1',
				highestGame: localStorage.getItem('highestGameID') || '1',
				isAdmin:     localStorage.getItem('isAdmin') || false
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
			props.selectedRoute = '/step1';
		}
		return (
			<div>
				<TopAppBar class="topappbar">
					<TopAppBar.Row>
						<TopAppBar.Section align-start>
							<TopAppBar.Icon menu onClick={this.openDrawer}>
								menu
							</TopAppBar.Icon>
							<TopAppBar.Title><div class={style.logo} /></TopAppBar.Title>
						</TopAppBar.Section>
						{/*<TopAppBar.Section align-end shrink-to-fit onClick={this.openSettings}>*/}
						{/*	<TopAppBar.Icon>settings</TopAppBar.Icon>*/}
						{/*</TopAppBar.Section>*/}
					</TopAppBar.Row>
				</TopAppBar>
				<Drawer modal ref={this.drawerRef}>
					<Drawer.DrawerContent>
						<Drawer.DrawerItem selected={props.selectedRoute === '/step1' || props.selectedRoute === '/'}  onClick={this.goHome}>
							<List.ItemGraphic>home</List.ItemGraphic>
							Home
						</Drawer.DrawerItem>
						{state.isAdmin && <Drawer.DrawerItem selected={props.selectedRoute === '/step1'} onClick={this.goToStep1}>
							<List.ItemGraphic>whatshot</List.ItemGraphic>
							Repeat Onboarding
						</Drawer.DrawerItem>}
						<Drawer.DrawerItem selected={props.selectedRoute === '/outcome'} onClick={this.goToOutcome}>
							<List.ItemGraphic>grade</List.ItemGraphic>
							Score &amp; Ranking
						</Drawer.DrawerItem>
						<Drawer.DrawerItem selected={props.selectedRoute === '/dash/1'} onClick={this.goToDash1}>
							<List.ItemGraphic>web_asset</List.ItemGraphic>
							Ninja Action
						</Drawer.DrawerItem>
						{state.highestGame > 1 && <Drawer.DrawerItem selected={props.selectedRoute === '/dash/2'} onClick={this.goToDash2}>
							<List.ItemGraphic>web_asset</List.ItemGraphic>
							Piggy Night
						</Drawer.DrawerItem>}
						{state.highestGame > 2 && <Drawer.DrawerItem selected={props.selectedRoute === '/dash/3'} onClick={this.goToDash3}>
							<List.ItemGraphic>web_asset</List.ItemGraphic>
							Crazy Balls
						</Drawer.DrawerItem>}
						{state.highestGame > 3 && <Drawer.DrawerItem selected={props.selectedRoute === '/dash/4'} onClick={this.goToDash4}>
							<List.ItemGraphic>web_asset</List.ItemGraphic>
							Balloon
						</Drawer.DrawerItem>}
						{state.highestGame > 4 && <Drawer.DrawerItem selected={props.selectedRoute === '/dash/5'} onClick={this.goToDash5}>
							<List.ItemGraphic>web_asset</List.ItemGraphic>
							Monsters Up
						</Drawer.DrawerItem>}
						{state.highestGame > 5 && <Drawer.DrawerItem selected={props.selectedRoute === '/dash/6'} onClick={this.goToDash6}>
							<List.ItemGraphic>web_asset</List.ItemGraphic>
							Basketball
						</Drawer.DrawerItem>}
						{state.highestGame > 6 && <Drawer.DrawerItem selected={props.selectedRoute === '/dash/7'} onClick={this.goToDash7}>
							<List.ItemGraphic>web_asset</List.ItemGraphic>
							Rolling Panda
						</Drawer.DrawerItem>}
						{state.highestGame > 7 && <Drawer.DrawerItem selected={props.selectedRoute === '/dash/8'} onClick={this.goToDash8}>
							<List.ItemGraphic>web_asset</List.ItemGraphic>
							Rise Up
						</Drawer.DrawerItem>}
						{state.highestGame > 8 && <Drawer.DrawerItem selected={props.selectedRoute === '/dash/9'} onClick={this.goToDash9}>
							<List.ItemGraphic>web_asset</List.ItemGraphic>
							Run Panda Run
						</Drawer.DrawerItem>}
						{state.highestGame > 9 && <Drawer.DrawerItem selected={props.selectedRoute === '/dash/10'} onClick={this.goToDash10}>
							<List.ItemGraphic>web_asset</List.ItemGraphic>
							Caveman Adventures
						</Drawer.DrawerItem>}
						{state.highestGame > 10 && <Drawer.DrawerItem selected={props.selectedRoute === '/dash/11'} onClick={this.goToDash11}>
							<List.ItemGraphic>web_asset</List.ItemGraphic>
							Jelly Jump
						</Drawer.DrawerItem>}
						{state.highestGame > 11 && <Drawer.DrawerItem selected={props.selectedRoute === '/dash/12'} onClick={this.goToDash12}>
							<List.ItemGraphic>web_asset</List.ItemGraphic>
							Swing Robber
						</Drawer.DrawerItem>}
						{state.isAdmin && <Drawer.DrawerItem selected={props.selectedRoute === '/metrics'} onClick={this.goToMetrics}>
							<List.ItemGraphic>explore</List.ItemGraphic>
							Metrics
						</Drawer.DrawerItem>}
						{state.isAdmin && <Drawer.DrawerItem selected={props.selectedRoute === '/lastpage'} onClick={this.goToLastPage}>
							<List.ItemGraphic>explore</List.ItemGraphic>
							Last Page
						</Drawer.DrawerItem>}
						{state.isAdmin && <Drawer.DrawerItem  onClick={this.resetSnoozes}>
							<List.ItemGraphic>build</List.ItemGraphic>
							Reset Snoozes
						</Drawer.DrawerItem>}
						{state.isAdmin && <Drawer.DrawerItem  onClick={this.showAllGames}>
							<List.ItemGraphic>build</List.ItemGraphic>
							Show All Games
						</Drawer.DrawerItem>}
					</Drawer.DrawerContent>
				</Drawer>
			</div>
		);
	}
}
