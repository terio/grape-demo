import grape, {Component} from 'grape';
const LIST_STYLES = {
    '0': 'red',
    '1': 'green'
}
class List extends Component {
    handleClick() {
        this.setState({});
    }
    render() {
        // return <ul onclick={this.handleClick.bind(this)}><li>start</li>{this.props.items.map(e => <Li key={e}>{e}</Li>)}<li>end</li></ul>;
        return <ul onclick={this.handleClick.bind(this)}><li>start</li>{this.props.items.filter(e => e % 2).map((e) => {
            return <Li onclick={this.props.deleteItem.bind(null, e)} key={e}>{e}</Li>
        })}<li>end</li><li>start2</li>{this.props.items.map((e, idx) => <Li2 key={e} deleteItem={this.props.deleteItem} liColor={LIST_STYLES[idx % 2]}>{e}</Li2>)}<li>end2</li></ul>;
    }
}
class Li extends Component {
    render() {
        return <div>{this.children}</div>;
    }
}
class Li2 extends Component {
    render() {
        return <li style={{'color': this.props.liColor}} onclick={this.props.deleteItem.bind(null, this.children[0].$$textContent)}>{this.children}</li>;
    }
}
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
function randomizeArray(ar) {
    const newAr = Array.from(ar);
    for(let i = newAr.length - 1; i > 0; i--) {
        const idx = getRandomInt(i + 1);
        const temp = newAr[idx];
        newAr[idx] = newAr[i];
        newAr[i] = temp;
    }
    return newAr;
}
export default class App extends Component {
    constructor(props, children) {
        super(props, children);
        this.state = {
            counter: 8,
            items: [1,2,3,4,5,6,7,8]
        };
    }
    add() {
        const newCounter = this.state.counter + 1;
        this.setState({
            counter: newCounter,
            items: this.state.items.concat([newCounter])
        });
    }
    remove() {
        const newCounter = this.state.counter - 1;
        this.state.items.pop();
        this.setState({
            items: this.state.items,
            counter: newCounter
        });
    }
    randomize() {
        const randomizedArray = randomizeArray(this.state.items);
        console.log(randomizedArray)
        this.setState({
            items: randomizedArray
        });
    }
    deleteItem(num) {
        this.state.items.splice(this.state.items.indexOf(num), 1);
        this.setState({
            items: this.state.items
        });
    }
    render() {
        return <div><span>Array is [{this.state.items.join(', ')}]</span><button onclick={this.add.bind(this)}>add</button><button onclick={this.remove.bind(this)}>remove</button><button onclick={this.randomize.bind(this)}>randomize</button>{this.state.counter % 2 ? 'something' : ''}<div><List deleteItem={this.deleteItem.bind(this)} items={this.state.items}/></div></div>;
    }
};
