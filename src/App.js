import { Route, Routes } from 'react-router-dom'
import Dashboard from './nav/components/Dashboard'
import LoginForm from './nav/components/LoginForm'
import ProtectedRoute from './nav/components/ProtectedRoute'
import SignUpForm from './nav/components/SignupForm'

const App = () => {
    return (
        <Routes>
            <Route
                path="/signup"
                element={<SignUpForm />}
            />
            <Route
                path="/login"
                element={<LoginForm />}
            />
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/"
                element={<LoginForm />}
            />
        </Routes>
    )
}

export default App
