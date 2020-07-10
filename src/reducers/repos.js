import {
    USER_GET_REPOS_REQUEST,
    USER_GET_REPOS_SUCCESS,
    USER_GET_REPOS_FAILURE
} from "../actions/repos";
import {REPO_ISSUES_GET_FAILURE, REPO_ISSUES_GET_REQUEST} from "../actions/issues";

const initialState = {
    repos: [],
    selectedRepo: null,
    apiStatus: {
        isLoading: false,
        hasLoaded: false,
        loadingError: null,
    }
}

const reposReducer = (state = initialState, action = {}) => {
    const { type, payload } = action
    switch (type) {
        case USER_GET_REPOS_REQUEST: {
            return {
                ...state,
                apiStatus: {
                    ...state.apiStatus,
                    isLoading: true,
                    hasLoaded: false
                }
            }
        }
        case USER_GET_REPOS_SUCCESS: {
            return {
                ...state,
                repos: {
                    ...state.repos,
                    ...payload
                },
                apiStatus: {
                    ...state.apiStatus,
                    isLoading: false,
                    hasLoaded: true
                }
            }
        }
        case USER_GET_REPOS_FAILURE: {
            return {
                ...state,
                apiStatus: {
                    ...state.apiStatus,
                    isLoading: false,
                    hasLoaded: false,
                    loadingError: payload
                }
            }
        }

        case REPO_ISSUES_GET_REQUEST: {
            return {
                ...state,
                selectedRepo: payload
            }
        }
        case REPO_ISSUES_GET_FAILURE: {
            return {
                ...state,
                selectedRepo: null
            }
        }

        default: return state
    }
}

export default reposReducer
