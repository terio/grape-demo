import grape, {Component} from 'grape';
class List extends Component {
    handleClick() {
        this.setState({});
    }
    render() {
        // return <ul onclick={this.handleClick.bind(this)}><li>start</li>{this.props.custom.items.map(e => <Li key={e}>{e}</Li>)}<li>end</li></ul>;
        return <ul onclick={this.handleClick.bind(this)}><li>start</li>{this.props.custom.items.filter(e => e % 2).map((e) => {
            return <Li onclick={this.props.custom.deleteItem.bind(null, e)} key={e}>{e}</Li>
        })}<li>end</li><li>start2</li>{this.props.custom.items.map(e => <li onclick={this.props.custom.deleteItem.bind(null, e)} key={e}>{e}</li>)}<li>end2</li></ul>;
    }
}
class Li extends Component {}
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
        return <div><span>Array is [{this.state.items.join(', ')}]</span><button onclick={this.add.bind(this)}>add</button><button onclick={this.remove.bind(this)}>remove</button><button onclick={this.randomize.bind(this)}>randomize</button><div><List deleteItem={this.deleteItem.bind(this)} items={this.state.items}/></div></div>;
    }
};
