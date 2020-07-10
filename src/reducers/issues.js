import {normalize, schema} from 'normalizr'
import {
    REPO_ISSUES_GET_REQUEST,
    REPO_ISSUES_GET_SUCCESS,
    REPO_ISSUES_GET_FAILURE,
    SET_REPO_ISSUES
} from "../actions/issues";

export const issue = new schema.Entity('issues')

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
                    isLoading: true,
                    hasLoaded: false
                }
            }
        }
        case REPO_ISSUES_GET_SUCCESS: {
            const normalizedIssues = normalize(payload,  [issue])
            return {
                ...state,
                issues: {
                    ...state.issues,
                    ...normalizedIssues.entities.issues
                },
                selectedRepoIssues: normalizedIssues.entities.issues,
                apiStatus: {
                    ...state.apiStatus,
                    isLoading: false,
                    hasLoaded: true
                }
            }
        }

        case REPO_ISSUES_GET_FAILURE: {
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

        case SET_REPO_ISSUES: {
            const normalizedIssues = normalize(payload,  [issue])
            return {
                ...state,
                issues: {
                    ...state.issues,
                    ...normalizedIssues.entities.issues
                },
                selectedRepoIssues: normalizedIssues.entities.issues,
            }
        }

        default: return state
    }
}

export default issuesReducer
