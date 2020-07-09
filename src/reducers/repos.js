import { USER_REPOS_SUCCESS } from "../actions";

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
        case USER_REPOS_SUCCESS: {
            return {
                ...state,
                repos: {
                    ...state.repos,
                    ...payload
                }
            }
        }
        default: return state
    }
}

export default reposReducer
