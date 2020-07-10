import {history} from "./configureStore";
import {Redirect, Route, Switch} from "react-router-dom";
import UserKeyForm from "./components/UserKeyForm";
import App from "./App";
import {ConnectedRouter} from "connected-react-router";
import React from "react";
import {useSelector} from "react-redux";

// A wrapper for <Route> that redirects to the home route
// screen if you're not yet authenticated.
const PrivateRoute = ({ component: Component, apiKeyIsValid, ...rest }) => (
    <Route
        {...rest}
        render={(props) => apiKeyIsValid
            ? <Component {...props} />
            : <Redirect to={{pathname: '/', state: {from: props.location}}} />}
    />
);

export const AppRouter = () => {
    const apiKeyIsValid = useSelector(state => state.user.apiKeyIsValid)
    return (
        <ConnectedRouter history={history}> { /* place ConnectedRouter under Provider */ }
            <> { /* your usual react-router v4/v5 routing */ }
                <Switch>
                    <Route exact path="/" component={UserKeyForm}/>
                    <PrivateRoute exact path="/repos" component={App} apiKeyIsValid={apiKeyIsValid} />
                </Switch>
            </>
        </ConnectedRouter>
    )
}

export default AppRouter
