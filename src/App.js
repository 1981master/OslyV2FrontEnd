import { Route, Routes } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import LoginForm from './components/LoginForm'
import ProtectedRoute from './components/ProtectedRoute'
import SignUpForm from './components/SignupForm'
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
