import {
    USER_GET_REPOS_REQUEST,
    USER_GET_REPOS_SUCCESS
} from "../actions/repos";

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

        default: return state
    }
}

export default reposReducer
