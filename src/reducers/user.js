import {USER_GET_REPOS_REQUEST} from "../actions/repos";

const initialState = {
    userApiKey: null,
}

const userReducer = (state = initialState, action = {}) => {
    const { type, payload } = action
    switch (type) {
        case USER_GET_REPOS_REQUEST: {
            return {
                ...state,
                userApiKey: payload,
            }
        }
        default: return state
    }
}

export default userReducer
