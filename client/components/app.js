import grape, {Component} from 'grape';

console.log(Component);
export default class App extends Component{
    render() {
        return <div>yo<span>Yo man</span></div>;
    }
};
