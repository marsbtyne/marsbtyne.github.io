import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk'; 
import { Provider } from 'react-redux';

import config from './config';
import { fetchFridges } from './svc'

import reducer from './redux/reducers/fridge';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

window.init = async () => {
  const fridges = await fetchFridges();
  const app  = (
    <Provider store={store}>
        <App fridges={fridges}/>
    </Provider>
  )
  ReactDOM.render(app, document.getElementById('root'));
}

const script = document.createElement('script');
script.src = `https://maps.googleapis.com/maps/api/js?key=${config.google.apiKey}&callback=init`;
script.defer = true;
document.head.appendChild(script);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
