import grape from 'grape';
import grapeDOM from 'grape/lib/dom/client';
import App from './components/App';

const app = <App/>;
grapeDOM.mount(document.getElementById('app'), app);
