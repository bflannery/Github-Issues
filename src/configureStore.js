import { createBrowserHistory } from 'history'
import { applyMiddleware, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import createRootReducer from './reducers'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

export const history = createBrowserHistory()

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['router']
}

const persistedReducer = persistReducer(persistConfig, createRootReducer(history))

export default function configureStore(preloadedState) {
    const middleware = [routerMiddleware(history), thunkMiddleware]
    const middlewareEnhancer = applyMiddleware(...middleware)

    const store = createStore(persistedReducer, preloadedState, composeWithDevTools(
        middlewareEnhancer,
        // other store enhancers if any
    ));
    if (process.env.NODE_ENV !== 'production' && module.hot) {
        module.hot.accept('./reducers', () => store.replaceReducer(persistedReducer))
    }

    const persistor = persistStore(store)
    return { store, persistor }

    // return store
}
