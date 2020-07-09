export const ACTION_PATH = 'src/actions/issues'

export const REPO_ISSUES_GET_REQUEST = `${ACTION_PATH}/REPO_ISSUES_GET_REQUEST`
export const REPO_ISSUES_GET_SUCCESS = `${ACTION_PATH}/REPO_ISSUES_GET_SUCCESS`
export const REPO_ISSUES_GET_FAILURE = `${ACTION_PATH}/REPO_ISSUES_GET_FAILURE`


export const repoIssuesGetRequestAction = (repo) => ({
    type: REPO_ISSUES_GET_REQUEST,
    payload: repo
})

export const repoIssuesGetSuccessAction = (issues) => ({
    type: REPO_ISSUES_GET_SUCCESS,
    payload: issues
})

export const repoIssuesGetFailureAction = (error) => ({
    type: REPO_ISSUES_GET_FAILURE,
    payload: error
})

export const fetchRepoIssuesAction = (repoName) => (dispatch, getState) => {
    dispatch(repoIssuesGetRequestAction(repoName))
    const userApiKey = getState().user.userApiKey
    fetch(`https://api.github.com/repos/${repoName}/issues`, {
        headers: new Headers({
            'Authorization': `token ${userApiKey}`,
        }),
    })
        .then(res => res.json())
        .then(issues => dispatch(repoIssuesGetSuccessAction(issues)))
}
