import { h, Component } from 'preact';
import { Router } from 'preact-router';
import { route } from 'preact-router';

import Card from 'preact-material-components/Card';
import Button from 'preact-material-components/Button';

import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';

import "react-responsive-carousel/lib/styles/carousel.min.css";

import { Carousel } from 'react-responsive-carousel';
import style from './style';

const images = ["../../assets/img/monstersUp.jpg", "../../assets/img/ninjaAction.jpg", "../../assets/img/flowMania.jpg","../../assets/img/monstersUp.jpg", "../../assets/img/ninjaAction.jpg", "../../assets/img/flowMania.jpg"];
const names = ["Monsters Up", "Ninja Action", "Flow Mania", "Monsters Up", "Ninja Action", "Flow Mania"];
const urls = ["https://thegametrove.com/UBT/#/gamedetail/6259ba10-5c25-47b4-8f18-1691788ee297", "https://thegametrove.com/UBT/#/gamedetail/fb6e5d9c-85a7-4f35-90f2-c99a993e4560",
"https://thegametrove.com/UBT/#/gamedetail/0f93a666-7e69-47f5-b14d-719ded39362b","https://thegametrove.com/UBT/#/gamedetail/6259ba10-5c25-47b4-8f18-1691788ee297", "https://thegametrove.com/UBT/#/gamedetail/fb6e5d9c-85a7-4f35-90f2-c99a993e4560",
"https://thegametrove.com/UBT/#/gamedetail/0f93a666-7e69-47f5-b14d-719ded39362b"];


export default class GamesCarousel extends Component {

   constructor() {

        super();

        this.state = {
          favoriteGameIndex: -1,
          favoriteGameName : "",
          favoritegameURL : ""
        };
        let s = JSON.parse(localStorage.getItem("savedFavorite"));
        if(s.favoriteGameIndex != -1) {
            this.setState(s);
            console.log(JSON.stringify(s));

        }
      }

	//gets called when this route is navigated to
	componentDidMount() {
	   // console.log(this.state)
	}

	//gets called just before navigating away from the route
	componentWillUnmount() {
	}

    newFave() {
        this.setState({favoriteGameIndex: -1});
        localStorage.setItem("savedFavorite", JSON.stringify(this.state));
    }

    click_item(index, element) {

        this.setState({favoriteGameIndex: index});
        this.setState({favoriteGameName : names[index]});
        this.setState({favoritegameURL : urls[index]});
        console.log(this.state);

        localStorage.setItem("savedFavorite", JSON.stringify(this.state));

        if(confirm("You've selected " + names[index] + "as your favorite game...Would you like to play it now?")) {
            document.location = urls[index];
        }
         else {
            alert("We'll try later...");
         }
    }

	render() {
        let hasFave = (this.state.favoriteGameIndex != -1);
        let index = this.state.favoriteGameIndex;

		return (

            <Card>
                <p />
                {!hasFave && <div class="mdc-typography--caption">Select your favorite game below...:</div>}
                {hasFave && <div>Your Favorite game is {this.state.favoriteGameName}</div>}
                {hasFave && <a href={urls[index]}><img height="250" src={images[index]} /></a>}
                {hasFave && <Button raised ripple
 onClick={() => this.newFave()}><strong>Pick another</strong></Button>}
                <p />
                {!hasFave && <Carousel height="90px"
                transitionTime={800}
                centerMode
                centerSlidePercentage={30}
                showArrows={false}
                infiniteLoop
                emulateTouch
                autoPlay
                showThumbs={false}
                onClickItem={(index, element) => this.click_item(index, element)}>
                    <div>
                        <img src={images[0]} />
                        <p className="legend">{names[0]}</p>
                    </div>
                    <div>
                        <img src={images[1]} />
                        <p className="legend">{names[1]}</p>
                    </div>
                    <div>
                        <img src={images[2]} />
                        <p className="legend">{names[2]}</p>
                    </div>
                    <div>
                        <img src={images[0]} />
                        <p className="legend">{names[0]}</p>
                    </div>
                    <div>
                        <img src={images[1]} />
                        <p className="legend">{names[1]}</p>
                    </div>
                    <div>
                        <img src={images[2]} />
                        <p className="legend">{names[2]}</p>
                    </div>
                </Carousel> }
            </Card>
    );
  };
}