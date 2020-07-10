import React from 'react';
import ReactDOM from 'react-dom';
import './scss/index.scss';
import * as serviceWorker from './serviceWorker';
import {Provider } from 'react-redux'
import configureStore from './configureStore'
import AppRouter from "./router";
import {loadState} from "./sessionStorage";

const isProduction = process.env.NODE_ENV === 'production'
const initialState = loadState(isProduction)

const store = configureStore(initialState)

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
         <AppRouter />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
