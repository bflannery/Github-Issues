import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers'

export default function configureStore(preloadedState) {
    const middleware = [thunkMiddleware]
    const middlewareEnhancer = applyMiddleware(...middleware)

    const store = createStore(rootReducer, preloadedState, composeWithDevTools(
        middlewareEnhancer,
        // other store enhancers if any
    ));
    if (process.env.NODE_ENV !== 'production' && module.hot) {
        module.hot.accept('./reducers', () => store.replaceReducer(rootReducer))
    }

    return store
}
