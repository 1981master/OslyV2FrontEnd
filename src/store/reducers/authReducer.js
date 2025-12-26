import {
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT,
    SIGNUP_FAILURE,
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
} from '../actions/types'

const initialState = {
    user: null,
    token: null,
    loading: false,
    error: null,
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        // SIGNUP
        case SIGNUP_REQUEST:
            return { ...state, loading: true, error: null }
        case SIGNUP_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload.user,
                token: action.payload.token,
                error: null,
            }
        case SIGNUP_FAILURE:
            return { ...state, loading: false, error: action.payload }

        // LOGIN
        case LOGIN_REQUEST:
            return { ...state, loading: true, error: null }
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload.user,
                token: action.payload.token,
                error: null,
            }
        case LOGIN_FAILURE:
            return { ...state, loading: false, error: action.payload }

        // LOGOUT
        case LOGOUT:
            return { ...initialState }

        default:
            return state
    }
}
