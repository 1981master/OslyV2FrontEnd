import axios from 'axios'

// Signup API function
export const signup = async (userData) => {
  try {
    const response = await axios.post(
      'http://localhost:8080/api/auth/signup',
      userData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    return response // You can handle success/failure in your component
  } catch (error) {
    console.error('Signup failed:', error)
    throw error
  }
}
