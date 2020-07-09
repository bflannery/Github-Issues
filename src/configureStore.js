import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import rootReducer from './reducers'

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default function configureStore(preloadedState) {
    const middleware = [thunkMiddleware]
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
}
