import	{	h,	Component	}	from	'preact';
import	{	auth	}	from	'../../firebase';

import	Card	from	'preact-material-components/Card';
import	'preact-material-components/Card/style.css';
import	'preact-material-components/Button/style.css';
import	style	from	'./style';
import	Button	from	'preact-material-components/Button';
import	firebase	from	'firebase/app';

export	default	class	Achievements	extends	Component	{

					myDB	=	firebase.database().ref('users/'	+	auth.currentUser.email.replace(/[,@).]/gi,	'_'));

		state	=	{
			achievement:	{	red:	0,green:	1,blue:	2,silver:	9,gold:	20,magic:	99	}
		};

	//gets	called	when	this	route	is	navigated	to
		componentDidMount()	{
			this.myDB.on('value',	snapshot	=>	{
				const	state	=	snapshot.val();
				this.setState(state);
			});
		}

	//gets	called	just	before	navigating	away	from	the	route
		componentWillUnmount()	{
		}

		writeUserAchievement(userId,	achievement)	{
			this.myDB.set({
				achievement
			});
		}

		bumpAchievement(achievement)	{
			let	user	=	auth.currentUser.email;

			this.state.achievement[achievement]++;
			this.writeUserAchievement(user,	this.state.achievement);
			this.setState(this.state);
		}

	//Note:	`user`	comes	from	the	URL,	courtesy	of	our	router
		render()	{
			return	(
				<div	class={style.newpage}>
					<Card>
						<div	class={style.cardBody}>
							<div	class={style.mylabel}>Achievements:</div>
							<div	class="mdc-typography--caption">These	achievements	were	found	for	this	user:</div>
							<p	/>
							<div	class={style.bgroup}>
								<span	class={`${style.achievement}	${style.red}`}>{this.state.achievement.red}</span>
								<span	class={`${style.achievement}	${style.green}`}>{this.state.achievement.green}</span>
								<span	class={`${style.achievement}	${style.blue}`}>{this.state.achievement.blue}</span>
								<span	class={`${style.achievement}	${style.silver}`}>{this.state.achievement.silver}</span>
								<span	class={`${style.achievement}	${style.gold}`}>{this.state.achievement.gold}</span>
								<span	class={`${style.achievement}	${style.magic}`}>{this.state.achievement.magic}</span>
							</div>
							<p	/>
							<div	class={style.mylabel}>Add	an	achievement</div>
							<div	class={style.bgroup}>
								<Button	raised	ripple	onClick={(e)	=>	this.bumpAchievement('red')}>Add	Red</Button>
								<Button	raised	ripple	onClick={(e)	=>	this.bumpAchievement('green')}>Add	Green</Button>
								<Button	raised	ripple	onClick={(e)	=>	this.bumpAchievement('blue')}>Add	Blue</Button>
								<p	/>
								<Button	raised	ripple	onClick={(e)	=>	this.bumpAchievement('silver')}>Add	Silver</Button>
								<Button	raised	ripple	onClick={(e)	=>	this.bumpAchievement('gold')}>Add	Gold</Button>
								<Button	raised	ripple	onClick={(e)	=>	this.bumpAchievement('magic')}>Add	Magic</Button>
							</div>
							<p	/>
						</div>
					</Card>
				</div>);
		}
}