import { push } from 'connected-react-router'

export const ACTION_PATH = 'src/actions/repos'

export const USER_GET_REPOS_REQUEST = `${ACTION_PATH}/USER_GET_REPOS_REQUEST`
export const USER_GET_REPOS_SUCCESS = `${ACTION_PATH}/USER_GET_REPOS_SUCCESS`
export const USER_GET_REPOS_FAILURE = `${ACTION_PATH}/USER_GET_REPOS_FAILURE`


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
    fetch('https://api.github.com/user/repos?per_page=100', {
        headers: new Headers({
            'Authorization': `token ${apiKey}`,
        }),
    })
        .then(res => res.json())
        .then(json => dispatch(userReposSuccessAction(json)))
        .then(() => dispatch(push('/repos')))
}
