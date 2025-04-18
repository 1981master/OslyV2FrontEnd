import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input, Typography, message } from 'antd'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { emailVerification } from './emailVerification' // Adjust the path
import PopupModal from './popupModal' // Adjust path if needed
import { signup } from './signup' // Adjust path as needed

const { Title, Text } = Typography

const SignUpForm = () => {
  const navigate = useNavigate()
  const [showPopup, setShowPopup] = useState(false)
  const [pendingUser, setPendingUser] = useState(null)

  const onFinish = async (values) => {
    const { username, email, password } = values
    const userData = { username, email, password }

    try {
      const response = await signup(userData)
      console.log('Signup success:', response.data)
      message.success('Account created successfully!')

      // Trigger email verification
      await emailVerification({ email }) // Call the backend to send the verification code to the email

      // Show verification modal
      setPendingUser(email)
      setShowPopup(true)
    } catch (err) {
      console.error('Signup error:', err)
      message.error('Signup failed. Please try again.')
    }
  }

  const handleCodeSubmit = async (code) => {
    try {
      const response = await axios.post(
        'http://localhost:8082/api/auth/verify-code',
        {
          email: pendingUser, // This is the email saved in the state
          code,
        },
      )
      message.success('Verification successful!')
      setShowPopup(false)
      navigate('/login') // Redirect to login after successful verification
    } catch (err) {
      message.error(err.response.data || 'Invalid or expired code')
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#f0f2f5',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <div
        style={{
          width: '100%',
          backgroundColor: '#576feb',
          padding: '16px 0',
          textAlign: 'center',
        }}
      >
        <Title
          level={2}
          style={{ color: '#fff', margin: 0 }}
        >
          Osly Online Shop
        </Title>
      </div>

      {/* Sign Up Form */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 24,
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: 360,
            backgroundColor: '#fff',
            padding: 32,
            borderRadius: 12,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          }}
        >
          <Form
            name="signup"
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item
              name="username"
              label="Username"
              rules={[
                { required: true, message: 'Please enter your username' },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Username"
              />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Please enter a valid email' },
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="Email"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: 'Please enter your password' },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="Confirm Password"
              dependencies={['password']}
              rules={[
                { required: true, message: 'Please confirm your password' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve()
                    }
                    return Promise.reject(new Error('Passwords do not match'))
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Confirm Password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
              >
                Sign Up
              </Button>
              <Text
                style={{ display: 'block', textAlign: 'center', marginTop: 16 }}
              >
                Already have an account? <a href="/login">Log in</a>
              </Text>
            </Form.Item>
          </Form>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          width: '100%',
          backgroundColor: '#576feb',
          padding: '12px 0',
          textAlign: 'center',
        }}
      >
        <Text style={{ color: '#fff' }}>
          © {new Date().getFullYear()} Osly. All rights reserved.
        </Text>
      </div>

      {/* Verification Modal */}
      <PopupModal
        visible={showPopup}
        onClose={() => setShowPopup(false)}
        title="Enter Verification Code"
        content={`We have sent a verification code to ${
          pendingUser || 'your email'
        }.`}
        onCodeSubmit={handleCodeSubmit}
      />
    </div>
  )
}

export default SignUpForm
