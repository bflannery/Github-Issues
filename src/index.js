import React from 'react';
import ReactDOM from 'react-dom';
import './scss/index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider, useSelector} from 'react-redux'
import configureStore, { history } from './configureStore'
// import { PersistGate } from 'redux-persist/integration/react'
import {Redirect, Route} from 'react-router-dom' // react-router v4/v5
import { ConnectedRouter } from 'connected-react-router'
import UserKeyForm from "./components/UserKeyForm";


// const { store, persistor } = configureStore()
const store = configureStore()

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
const PrivateRoute = ({ children, ...rest }) => {
    const apiKeyIsValid = useSelector(state => state.user.apiKeyIsValid)
    return (
        <Route
            {...rest}
            render={({ location }) =>
                apiKeyIsValid ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          {/*<PersistGate loading={null} persistor={persistor}>*/}
              <ConnectedRouter history={history}> { /* place ConnectedRouter under Provider */ }
                  <> { /* your usual react-router v4/v5 routing */ }
                          <PrivateRoute exact path="/repos" render={() => (<App />)} />
                          <Route exact path="/" render={() => (<UserKeyForm />)} />
                  </>
              </ConnectedRouter>
            <App />
          {/*</PersistGate>*/}
      </Provider>,
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
