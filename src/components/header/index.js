import { h, Component } from 'preact';
import { route } from 'preact-router';
import TopAppBar from 'preact-material-components/TopAppBar';
import Drawer from 'preact-material-components/Drawer';
import List from 'preact-material-components/List';
import Dialog from 'preact-material-components/Dialog';
import Switch from 'preact-material-components/Switch';
import 'preact-material-components/Switch/style.css';
import 'preact-material-components/Dialog/style.css';
import 'preact-material-components/Drawer/style.css';
import 'preact-material-components/List/style.css';
import 'preact-material-components/TopAppBar/style.css';

export default class Header extends Component {

	toggleDarkTheme = () => {
		this.setState(
			{
				darkThemeEnabled: !this.state.darkThemeEnabled
			},
			() => {
				if (this.state.darkThemeEnabled) {
					document.body.classList.add('mdc-theme--dark');
				}
				else {
					document.body.classList.remove('mdc-theme--dark');
				}
			}
		);
	};

	closeDrawer() {
		this.drawer.MDComponent.open = false;
		//this.state.darkThemeEnabled = false;
	}

	openDrawer = () => (this.drawer.MDComponent.open = true);
	openSettings = () => this.dialog.MDComponent.show();

	drawerRef = drawer => (this.drawer = drawer);
	dialogRef = dialog => (this.dialog = dialog);

	linkTo = path => () => {
		route(path);
		this.closeDrawer();
	};

	goHome = this.linkTo('/');
	goToMyProfile = this.linkTo('/profile');
	goToSignUp = this.linkTo('/signup');
	goToSignIn = this.linkTo('/signin');
	goToSignOut = this.linkTo('/signout');
	goToBoards = this.linkTo('/boards');
	goToDash1 = this.linkTo('/dash/1');
	goToDash2 = this.linkTo('/dash/2');
	goToDash3 = this.linkTo('/dash/3');
	goToDash4 = this.linkTo('/dash/4');
	goToDash5 = this.linkTo('/dash/5');
	goToDash6= this.linkTo('/dash/6');
	goToDash7 = this.linkTo('/dash/7');
	goToAlmostHere = this.linkTo('/almosthere');
	goToStep1 = this.linkTo('/step1');


	constructor() {
		super();
		this.state = {
			darkThemeEnabled: true
		},
		() => {
			if (this.state.darkThemeEnabled) {
				if (typeof window !== 'undefined') {
					document.body.classList.add('mdc-theme--dark');
				}
			}
			else if (typeof window !== 'undefined') {
				document.body.classList.remove('mdc-theme--dark');
			}
		};
		if (typeof window !== 'undefined') {
		    document.body.classList.add('mdc-theme--dark');
		}
	}


	render(props) {

		return (
			<div>
				<TopAppBar className="topappbar">
					<TopAppBar.Row>
						<TopAppBar.Section align-start>
							<TopAppBar.Icon menu onClick={this.openDrawer}>
								menu
							</TopAppBar.Icon>
							<TopAppBar.Title>DraftCards</TopAppBar.Title>
						</TopAppBar.Section>
						<TopAppBar.Section align-end shrink-to-fit onClick={this.openSettings}>
							<TopAppBar.Icon>settings</TopAppBar.Icon>
						</TopAppBar.Section>
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
						<Drawer.DrawerItem selected={props.selectedRoute === '/almosthere'} onClick={this.goToAlmostHere}>
							<List.ItemGraphic>web_asset</List.ItemGraphic>
							Alternate On Board
						</Drawer.DrawerItem>
						<Drawer.DrawerItem selected={props.selectedRoute === '/dash/1'} onClick={this.goToDash1}>
							<List.ItemGraphic>web_asset</List.ItemGraphic>
							FSD 1
						</Drawer.DrawerItem>
						<Drawer.DrawerItem selected={props.selectedRoute === '/dash/2'} onClick={this.goToDash2}>
							<List.ItemGraphic>web_asset</List.ItemGraphic>
							FSD 2
						</Drawer.DrawerItem>
						<Drawer.DrawerItem selected={props.selectedRoute === '/dash/3'} onClick={this.goToDash3}>
							<List.ItemGraphic>web_asset</List.ItemGraphic>
							FSD 3
						</Drawer.DrawerItem>
						<Drawer.DrawerItem selected={props.selectedRoute === '/dash/4'} onClick={this.goToDash4}>
							<List.ItemGraphic>web_asset</List.ItemGraphic>
							FSD 4
						</Drawer.DrawerItem>
						<Drawer.DrawerItem selected={props.selectedRoute === '/dash/5'} onClick={this.goToDash5}>
							<List.ItemGraphic>web_asset</List.ItemGraphic>
							FSD 5
						</Drawer.DrawerItem>
						{/*<Drawer.DrawerItem selected={props.selectedRoute === '/profile'} onClick={this.goToMyProfile}>*/}
						{/*	<List.ItemGraphic>account_circle</List.ItemGraphic>*/}
						{/*	Profile*/}
						{/*</Drawer.DrawerItem>*/}
						{/*<Drawer.DrawerItem selected={props.selectedRoute === '/signin'} onClick={this.goToSignIn}>*/}
						{/*	<List.ItemGraphic>account_circle</List.ItemGraphic>*/}
						{/*	Sign-In*/}
						{/*</Drawer.DrawerItem>*/}
						{/*<Drawer.DrawerItem selected={props.selectedRoute === '/boards'} onClick={this.goToBoards}>*/}
						{/*	<List.ItemGraphic>account_circle</List.ItemGraphic>*/}
						{/*	Leaderboard*/}
						{/*</Drawer.DrawerItem>*/}
						{/*<Drawer.DrawerItem selected={props.selectedRoute === '/signout'} onClick={this.goToSignOut}>*/}
						{/*	<List.ItemGraphic>account_circle</List.ItemGraphic>*/}
						{/*	Sign-Out*/}
						{/*</Drawer.DrawerItem>*/}
					</Drawer.DrawerContent>
				</Drawer>
				<Dialog ref={this.dialogRef}>
					<Dialog.Header>Settings</Dialog.Header>
					<Dialog.Body>
						<div>
							Enable dark theme <Switch onClick={this.toggleDarkTheme}  checked={this.state.darkThemeEnabled} />
						</div>
					</Dialog.Body>
					<Dialog.Footer>
						<Dialog.FooterButton accept>OK</Dialog.FooterButton>
					</Dialog.Footer>
				</Dialog>
			</div>
		);
	}
}
