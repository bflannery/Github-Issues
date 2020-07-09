import {
    REPO_ISSUES_GET_REQUEST,
    REPO_ISSUES_GET_SUCCESS
} from "../actions/issues";

const initialState = {
    issues: [],
    apiStatus: {
        isLoading: false,
        hasLoaded: false,
        loadingError: null,
    }
}

const issuesReducer = (state = initialState, action = {}) => {
    const { type, payload } = action
    switch (type) {
        case REPO_ISSUES_GET_REQUEST: {
            return {
                ...state,
                apiStatus: {
                    ...state.apiStatus,
                    isLoading: true
                }
            }
        }
        case REPO_ISSUES_GET_SUCCESS: {
            return {
                ...state,
                issues: {
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

export default issuesReducer
