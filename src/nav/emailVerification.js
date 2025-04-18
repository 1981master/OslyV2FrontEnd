import axios from 'axios'

export const emailVerification = async (userData) => {
  try {
    const response = await axios.post(
      'http://localhost:8082/api/auth/emailVerfi', // Your backend API for sending verification code
      userData,
      {
        Headers: {
          'Content-type': 'application/json',
        },
      },
    )
    return response
  } catch (error) {
    console.log('Fatal loading email verification', error)
    throw error
  }
}
