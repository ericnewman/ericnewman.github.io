import { h, Component } from 'preact';
import { route } from 'preact-router';
import TopAppBar from 'preact-material-components/TopAppBar';
import Drawer from 'preact-material-components/Drawer';
import List from 'preact-material-components/List';
// import Dialog from 'preact-material-components/Dialog';
// import Switch from 'preact-material-components/Switch';
import 'preact-material-components/Switch/style.css';
import 'preact-material-components/Dialog/style.css';
import 'preact-material-components/Drawer/style.css';
import 'preact-material-components/List/style.css';
import 'preact-material-components/TopAppBar/style.css';
import style from './style';

export default class Header extends Component {


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

	goHome = this.linkTo('/');
	goToDash8 = this.linkTo('/dash/8');
	goToDash1 = this.linkTo('/dash/1');
	goToDash2 = this.linkTo('/dash/2');
	goToDash3 = this.linkTo('/dash/3');
	goToDash4 = this.linkTo('/dash/4');
	goToDash5 = this.linkTo('/dash/5');
	goToDash6 = this.linkTo('/dash/6');
	goToDash7 = this.linkTo('/dash/7');
	goToDash8 = this.linkTo('/dash/8');
	goToDash9 = this.linkTo('/dash/9');
	goToDash10 = this.linkTo('/dash/10');
	goToDash11 = this.linkTo('/dash/11');
	goToDash12 = this.linkTo('/dash/12');
	goToDash13 = this.linkTo('/dash/13');
	goToDash14 = this.linkTo('/dash/14');
	goToDash15 = this.linkTo('/dash/15');
	goToOutcome = this.linkTo('/outcome');
	goToMetrics = this.linkTo('/metrics');
	goToStep1 = this.linkTo('/step1');

	resetExp = () => {
		localStorage.setItem('seenWelcomeMessage', false);
		this.closeDrawer();
		route('/');
	}


	render(props) {
		if(!props.selectedRoute) {
			props.selectedRoute = '/';
		}

		return (
			<div>
				<TopAppBar class="topappbar">
					<TopAppBar.Row>
						<TopAppBar.Section align-start>
							<TopAppBar.Icon menu onClick={this.openDrawer}>
								menu
							</TopAppBar.Icon>
							<TopAppBar.Title><div class={style.logo}></div></TopAppBar.Title>
						</TopAppBar.Section>
						{/*<TopAppBar.Section align-end shrink-to-fit onClick={this.openSettings}>*/}
						{/*	<TopAppBar.Icon>settings</TopAppBar.Icon>*/}
						{/*</TopAppBar.Section>*/}
					</TopAppBar.Row>
				</TopAppBar>
				<Drawer modal ref={this.drawerRef}>
					<Drawer.DrawerContent>
						<Drawer.DrawerItem selected={props.selectedRoute === '/'} onClick={this.goHome}>
							<List.ItemGraphic>home</List.ItemGraphic>
							Home
						</Drawer.DrawerItem>
						<Drawer.DrawerItem selected={props.selectedRoute === '/step1'} onClick={this.goToStep1}>
							<List.ItemGraphic>web_asset</List.ItemGraphic>
							Day 1 - Onboarding
						</Drawer.DrawerItem>
						<Drawer.DrawerItem selected={props.selectedRoute === '/outcome'} onClick={this.goToOutcome}>
							<List.ItemGraphic>web_asset</List.ItemGraphic>
							Medals
						</Drawer.DrawerItem>
						<Drawer.DrawerItem selected={props.selectedRoute === '/dash/13'} onClick={this.goToDash13}>
							<List.ItemGraphic>web_asset</List.ItemGraphic>
							Monsters Up
						</Drawer.DrawerItem>
						<Drawer.DrawerItem selected={props.selectedRoute === '/dash/1'} onClick={this.goToDash1}>
							<List.ItemGraphic>web_asset</List.ItemGraphic>
							Ninja Action
						</Drawer.DrawerItem>
						<Drawer.DrawerItem selected={props.selectedRoute === '/dash/2'} onClick={this.goToDash2}>
							<List.ItemGraphic>web_asset</List.ItemGraphic>
							Robotion
						</Drawer.DrawerItem>
						<Drawer.DrawerItem selected={props.selectedRoute === '/dash/3'} onClick={this.goToDash3}>
							<List.ItemGraphic>web_asset</List.ItemGraphic>
							Swing Robber
						</Drawer.DrawerItem>
						<Drawer.DrawerItem selected={props.selectedRoute === '/dash/4'} onClick={this.goToDash4}>
							<List.ItemGraphic>web_asset</List.ItemGraphic>
							Balloon
						</Drawer.DrawerItem>
						<Drawer.DrawerItem selected={props.selectedRoute === '/dash/5'} onClick={this.goToDash5}>
							<List.ItemGraphic>web_asset</List.ItemGraphic>
							Basketball
						</Drawer.DrawerItem>
						<Drawer.DrawerItem selected={props.selectedRoute === '/dash/6'} onClick={this.goToDash6}>
							<List.ItemGraphic>web_asset</List.ItemGraphic>
							Caveman Adventures
						</Drawer.DrawerItem>
						<Drawer.DrawerItem selected={props.selectedRoute === '/dash/7'} onClick={this.goToDash7}>
							<List.ItemGraphic>web_asset</List.ItemGraphic>
							Jelly Jump
						</Drawer.DrawerItem>
						<Drawer.DrawerItem selected={props.selectedRoute === '/'} onClick={this.resetExp}>
							<List.ItemGraphic>web_asset</List.ItemGraphic>
							Reset to First Day
						</Drawer.DrawerItem>
						<Drawer.DrawerItem selected={props.selectedRoute === '/metrics'} onClick={this.goToMetrics}>
							<List.ItemGraphic>web_asset</List.ItemGraphic>
							Metrics
						</Drawer.DrawerItem>
					</Drawer.DrawerContent>
				</Drawer>
				{/*<Dialog ref={this.dialogRef}>*/}
				{/*	<Dialog.Header>Settings</Dialog.Header>*/}
				{/*	<Dialog.Body>*/}
				{/*		<div>*/}
				{/*			Enable dark theme <Switch onClick={this.toggleDarkTheme}  checked={this.state.darkThemeEnabled} />*/}
				{/*		</div>*/}
				{/*	</Dialog.Body>*/}
				{/*	<Dialog.Footer>*/}
				{/*		<Dialog.FooterButton accept>OK</Dialog.FooterButton>*/}
				{/*	</Dialog.Footer>*/}
				{/*</Dialog>*/}
			</div>
		);
	}
}
