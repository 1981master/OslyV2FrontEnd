import axios from 'axios'
import { SIGNUP_FAILURE, SIGNUP_REQUEST, SIGNUP_SUCCESS } from './types'

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
            payload: err.response?.data || 'Signup failed',
        })
    }
}
