import { RSAA } from 'redux-api-middleware'
import { loginEndpoint, signupEndpoint } from '../../service/api'
import {
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT,
    SIGNUP_FAILURE,
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
} from './types'

// Signup action

// RSAA action for signup
export const signupUser = (userData) => ({
    [RSAA]: {
        endpoint: signupEndpoint(),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
        types: [
            SIGNUP_REQUEST,
            SIGNUP_SUCCESS,
            {
                type: SIGNUP_FAILURE,
                payload: (action, state, res) =>
                    res.json().then(
                        (data) => data,
                        () => 'Signup failed, please try again later...',
                    ),
            },
        ],
    },
})

// Login action
// RSAA action for login
export const loginUser = (credentials) => ({
    [RSAA]: {
        endpoint: loginEndpoint(),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
        types: [
            LOGIN_REQUEST,
            {
                type: LOGIN_SUCCESS,
                payload: async (action, state, res) => {
                    const data = await res.json()
                    // store token in localStorage
                    localStorage.setItem('authToken', data.token)
                    return data
                },
            },
            {
                type: LOGIN_FAILURE,
                payload: async (action, state, res) => {
                    try {
                        const data = await res.json()
                        return data
                    } catch {
                        return 'Login failed Invalid username or password'
                    }
                },
            },
        ],
    },
})

// Logout action
export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('authToken')
    dispatch({ type: LOGOUT })
}
