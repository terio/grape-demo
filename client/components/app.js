import grape, {Component} from 'grape';
class List extends Component {
    handleClick() {
        this.setState({});
    }
    render() {
        return <ul onclick={this.handleClick.bind(this)}>{this.props.custom.items.map(e => <li key={e}>{e}</li>)}</ul>;
    }
}
export default class App extends Component {
    constructor(props, children) {
        super(props, children);
        this.state = {
            counter: 2,
            items: [1,2]
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
        this.state.items.pop();
        this.setState({
            items: this.state.items
        });
    }
    render() {
        return <div>yo<span>Yo man</span><button onclick={this.add.bind(this)}>add</button><button onclick={this.remove.bind(this)}>remove</button><div><List items={this.state.items}/></div></div>;
    }
};
