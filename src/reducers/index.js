import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import reposReducer from './repos'
import userReducer from "./user";
import issuesReducer from "./issues";


const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    issues: issuesReducer,
    repos: reposReducer,
    user: userReducer,

})

export default createRootReducer;
