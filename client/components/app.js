import grape, {Component} from 'grape';
class List extends Component {
    handleClick() {
        this.setState({});
    }
    render() {
        // return <ul onclick={this.handleClick.bind(this)}>{this.props.custom.items.map(e => <Li key={e}>{e}</Li>)}</ul>;
        return <ul onclick={this.handleClick.bind(this)}>{this.props.custom.items.map(e => <li onclick={this.props.custom.deleteItem.bind(null, e)} key={e}>{e}</li>)}</ul>;
    }
}
class Li extends Component {}
export default class App extends Component {
    constructor(props, children) {
        super(props, children);
        this.state = {
            counter: 0,
            items: []
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
    deleteItem(num) {
        this.state.items.splice(this.state.items.indexOf(num), 1);
        this.setState({
            items: this.state.items
        });
    }
    render() {
        return <div>yo{this.state.counter % 2 ? <span>Yo man</span> : null}<button onclick={this.add.bind(this)}>add</button><button onclick={this.remove.bind(this)}>remove</button><div><List deleteItem={this.deleteItem.bind(this)} items={this.state.items}/></div></div>;
    }
};
