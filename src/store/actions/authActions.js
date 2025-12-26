import axios from 'axios'
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
export const signupUser = (userData) => async (dispatch) => {
    dispatch({ type: SIGNUP_REQUEST })
    try {
        const response = await axios.post(
            'http://localhost:8080/api/auth/signup',
            userData,
        )
        dispatch({ type: SIGNUP_SUCCESS, payload: response.data })
    } catch (err) {
        dispatch({
            type: SIGNUP_FAILURE,
            payload:
                err.response?.data || 'Signup failed please try again later...',
        })
    }
}

// Login action
export const loginUser = (credentials) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST })
    try {
        const response = await axios.post(
            'http://localhost:8080/api/auth/login',
            credentials,
        )
        const { token, user } = response.data
        localStorage.setItem('authToken', token)

        dispatch({
            type: LOGIN_SUCCESS,
            payload: { user, token },
        })
    } catch (err) {
        dispatch({
            type: LOGIN_FAILURE,
            payload: err.response?.data || 'Login failed',
        })
    }
}

// Logout action
export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('authToken')
    dispatch({ type: LOGOUT })
}
