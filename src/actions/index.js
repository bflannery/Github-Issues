export const ACTION_PATH = 'src/actions/index'
export const USER_REPOS_REQUEST = `${ACTION_PATH}/USER_REPOS_REQUEST`
export const USER_REPOS_SUCCESS = `${ACTION_PATH}/USER_REPOS_SUCCESS`
export const USER_REPOS_FAILURE = `${ACTION_PATH}/USER_REPOS_FAILURE`


export const userReposRequestAction = (apiKey) => ({
    type: USER_REPOS_REQUEST,
    payload: apiKey
})

export const userReposSuccessAction = (repos) => ({
    type: USER_REPOS_SUCCESS,
    payload: repos
})

export const userReposFailureAction = (error) => ({
    type: USER_REPOS_FAILURE,
    payload: error
})

