import { combineReducers } from 'redux'
import reposReducer from './repos'
import userReducer from "./user";
import issuesReducer from "./issues";

const rootReducer = combineReducers({
    issues: issuesReducer,
    repos: reposReducer,
    user: userReducer,

})

export default rootReducer;
