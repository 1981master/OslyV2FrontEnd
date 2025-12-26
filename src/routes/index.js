import { Route, Routes } from 'react-router-dom'
import Dashboard from '../components/Dashboard'
import LoginForm from '../components/LoginForm'
import ProtectedRoute from '../components/ProtectedRoute'
import SignUpForm from '../components/SignupForm'

const AppRoutes = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={<LoginForm />}
            />
            <Route
                path="/login"
                element={<LoginForm />}
            />
            <Route
                path="/signup"
                element={<SignUpForm />}
            />
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />
        </Routes>
    )
}

export default AppRoutes
