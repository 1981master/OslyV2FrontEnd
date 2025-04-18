import React from 'react'
import { Route, Routes } from 'react-router-dom' // Import Routes and Route
import Dashboard from './nav/Dashboard'
import LoginForm from './nav/loginForm' // Your LoginForm component
import SignUpForm from './nav/signupForm' // Your SignUpForm component

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
        element={<Dashboard />}
      />
      <Route
        path="/"
        element={<LoginForm />}
      />
      {/* Default route */}
    </Routes>
  )
}

export default App
