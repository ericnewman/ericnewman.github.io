import {Component} from 'preact';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import style from './style';


const GameIcon = (props) => {
    let stylex = "";


    return (

        <div class={`${style.icon} ${stylex}`}><div class={style.num}>{props.progress}</div></div>
    )
}

export default class JourneyMap extends Component {


    constructor(props) {
        super(props);

        this.onChange.bind(this);
        this.onComplete.bind(this);
    }

    componentWillMount(props) {
        // stop when not renderable
        this.props.color = "#FF3"
        this.props.title = "Level";

        this.timer = setInterval(() => {
            this.randomize();
        }, 800);

    }


    render(props, state) {
        return (
            <div class={style.bar}>
                <Progress
                    className={style.loader}
                    value={state.progress} height="32px" color={props.color}
                    onChange={this.onChange}
                    onComplete={this.onComplete}
                />
                <div className={style.title}>
                    {props.title}
                </div>
                <Coin metal="brass" earned={props.earnedBrass} progress={props.brassPts}/>
                <Coin metal="silver" earned={props.earnedSilver} progress={props.silverPts}/>
                <Coin metal="gold" earned={props.earnedGold} progress={props.goldPts}/>
            </div>
        );
    }
}
