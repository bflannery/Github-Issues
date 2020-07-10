import React from 'react';
import ReactDOM from 'react-dom';
import './scss/index.scss';
import * as serviceWorker from './serviceWorker';
import {Provider } from 'react-redux'
import configureStore, { history } from './configureStore'
// import { PersistGate } from 'redux-persist/integration/react'
import AppRouter from "./router";


// const { store, persistor } = configureStore()
const store = configureStore()

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          {/*<PersistGate loading={null} persistor={persistor}>*/}
             <AppRouter />
          {/*</PersistGate>*/}
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
