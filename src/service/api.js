export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

export const signupEndpoint = () => `${API_BASE_URL}/api/auth/signup`
export const loginEndpoint = () => `${API_BASE_URL}/api/auth/login`
export const verifyCodeEndpoint = () => `${API_BASE_URL}/api/auth/verify-code`
export const getProducts = () => `${API_BASE_URL}/api/products`
