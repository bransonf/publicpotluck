import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import { configureStore } from './store'
import * as serviceWorker from './serviceWorker';
import './styles/global.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const ConnectedApp = () => (
  <Provider store={configureStore()}>
    <App />
  </Provider>
)

ReactDOM.render(<ConnectedApp />, document.getElementById('root'));

serviceWorker.unregister();
