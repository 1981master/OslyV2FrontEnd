import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input, Typography, message } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signupUser } from '../store/actions/authActions' // Redux signup action
import { EmailVerification } from './EmailVerification'
import PopupModal from './PopupModal'

const { Title, Text } = Typography

const SignUpForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user, loading, error } = useSelector((state) => state.auth)

    const [showPopup, setShowPopup] = useState(false)
    const [pendingUser, setPendingUser] = useState(null)
    const [popupError, setPopupError] = useState(null)

    // Show error from Redux in modal
    useEffect(() => {
        if (error) {
            setPopupError(error)
            setShowPopup(true)
        }
    }, [error])

    const onFinish = async (values) => {
        const { username, email, password } = values
        const userData = { username, email, password }

        // Dispatch signup action
        await dispatch(signupUser(userData))

        if (user) {
            // use user from Redux state
            message.success('Account created successfully!')

            // Trigger email verification
            await EmailVerification({ email })

            setPendingUser(email)
            setPopupError(null)
            setShowPopup(true)
        }
    }

    const handleCodeSubmit = async (code) => {
        try {
            await fetch('http://localhost:8080/api/auth/verify-code', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: pendingUser, code }),
            })
            message.success('Verification successful!')
            setShowPopup(false)
            navigate('/login')
        } catch (err) {
            message.error(err.response?.data || 'Invalid or expired code')
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
                                {
                                    required: true,
                                    message: 'Please enter your username',
                                },
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
                                {
                                    required: true,
                                    message: 'Please enter your email',
                                },
                                {
                                    type: 'email',
                                    message: 'Please enter a valid email',
                                },
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
                                {
                                    required: true,
                                    message: 'Please enter your password',
                                },
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
                                {
                                    required: true,
                                    message: 'Please confirm your password',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (
                                            !value ||
                                            getFieldValue('password') === value
                                        ) {
                                            return Promise.resolve()
                                        }
                                        return Promise.reject(
                                            new Error('Passwords do not match'),
                                        )
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
                                loading={loading}
                            >
                                Sign Up
                            </Button>
                            <Text
                                style={{
                                    display: 'block',
                                    textAlign: 'center',
                                    marginTop: 16,
                                }}
                            >
                                Already have an account?{' '}
                                <a href="/login">Log in</a>
                            </Text>
                        </Form.Item>
                    </Form>
                </div>
            </div>

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

            <PopupModal
                visible={showPopup}
                onClose={() => {
                    setShowPopup(false)
                    setPopupError(null)
                }}
                title={popupError ? 'Signup Error' : 'Enter Verification Code'}
                content={
                    popupError
                        ? popupError
                        : `We have sent a verification code to ${
                              pendingUser || 'your email'
                          }.`
                }
                onCodeSubmit={popupError ? null : handleCodeSubmit}
            />
        </div>
    )
}

export default SignUpForm
