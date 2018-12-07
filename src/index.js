import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import App from './components/App';
import {composeWithDevTools} from 'redux-devtools-extension';
import {createStore} from 'redux';
import reducer from './reducers';
import {Provider} from 'react-redux';
import middleware from './middleware';

const store = createStore(reducer, composeWithDevTools(middleware));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
