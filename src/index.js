import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom' // Import BrowserRouter
import App from './App' // Assuming you have App.js which contains your routes
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Router>
      {' '}
      {/* Wrap your App with Router */}
      <App /> {/* App contains routing */}
    </Router>
  </React.StrictMode>,
)
