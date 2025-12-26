// src/nav/components/ProtectedRoute.js
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('authToken')

    if (!token) {
        // Redirect to login page if token is missing
        return (
            <Navigate
                to="/login"
                replace
            />
        )
    }

    // Render the child component if token exists
    return children
}

export default ProtectedRoute
