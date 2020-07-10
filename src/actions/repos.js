import { push } from 'connected-react-router'
import {saveState} from "../sessionStorage";

export const ACTION_PATH = 'src/actions/repos'

export const USER_GET_REPOS_REQUEST = `${ACTION_PATH}/USER_GET_REPOS_REQUEST`
export const USER_GET_REPOS_SUCCESS = `${ACTION_PATH}/USER_GET_REPOS_SUCCESS`
export const USER_GET_REPOS_FAILURE = `${ACTION_PATH}/USER_GET_REPOS_FAILURE`

// Github defaults to 30
const REPOS_PER_PAGE = '20'

export const userReposRequestAction = (apiKey) => ({
    type: USER_GET_REPOS_REQUEST,
    payload: apiKey
})

export const userReposSuccessAction = (repos) => ({
    type: USER_GET_REPOS_SUCCESS,
    payload: repos
})

export const userReposFailureAction = (error) => ({
    type: USER_GET_REPOS_FAILURE,
    payload: error
})

export const fetchUserReposAction = (apiKey) => (dispatch, getState) => {
    dispatch(userReposRequestAction(apiKey))
    fetch(`https://api.github.com/user/repos?per_page=${REPOS_PER_PAGE}`, {
        headers: new Headers({
            'Authorization': `token ${apiKey}`,
        }),
    })
        .then(res => res.json())
        .then(json => dispatch(userReposSuccessAction(json)))
        .then(() => saveState(getState()))
        .then(() => dispatch(push('/repos')))
        .catch(err => dispatch(userReposFailureAction(err)))
}
