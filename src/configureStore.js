import { createBrowserHistory } from 'history'
import { applyMiddleware, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import createRootReducer from './reducers'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

export const history = createBrowserHistory()


export default function configureStore(preloadedState) {
    const middleware = [routerMiddleware(history), thunkMiddleware]
    const middlewareEnhancer = applyMiddleware(...middleware)

   return createStore(createRootReducer(history), preloadedState, composeWithDevTools(
        middlewareEnhancer,
        // other store enhancers if any
    ));
}
