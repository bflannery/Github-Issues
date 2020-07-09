import {USER_GET_REPOS_REQUEST, USER_GET_REPOS_SUCCESS} from "../actions/repos";

const initialState = {
    userApiKey: '',
    apiKeyIsValid: false
}

const userReducer = (state = initialState, action = {}) => {
    const { type, payload } = action
    switch (type) {
        case USER_GET_REPOS_REQUEST: {
            return {
                ...state,
                userApiKey: payload,
                apiKeyIsValid: false,
            }
        }
        case USER_GET_REPOS_SUCCESS: {
            return {
                ...state,
                apiKeyIsValid: true,
            }
        }
        default: return state
    }
}

export default userReducer
