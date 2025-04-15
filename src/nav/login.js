import axios from 'axios'

// Base API URL (update this with your backend URL)
const API_URL = 'http://localhost:8082/api/auth' // Replace with your actual backend API URL

// Login API function
export const login = async (credentials) => {
  try {
    const response = await axios.post(
      `http://localhost:8082/api/auth/login`,
      credentials,
      {
        headers: {
          'Content-Type': 'application/json', // Setting Content-Type as JSON
        },
      },
    )

    return response // Returns the response object (which contains the token)
  } catch (error) {
    // Handle any error
    console.error('Login failed:', error)
    throw error // You can handle the error further as needed in your component
  }
}
