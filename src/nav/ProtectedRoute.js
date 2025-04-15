// src/components/ProtectedRoute.js
import React from 'react'
import { Redirect, Route } from 'react-router-dom'

// ProtectedRoute component to protect routes
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem('authToken')

  if (!token) {
    // If no token is found, redirect to login page
    return <Redirect to="/login" />
  }

  // If token exists, render the requested component
  return (
    <Route
      {...rest}
      render={(props) => <Component {...props} />}
    />
  )
}

export default ProtectedRoute
