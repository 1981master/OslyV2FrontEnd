import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Alert, Button, Checkbox, Form, Input, message, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../store/actions/authActions' // Redux login action

const { Title, Text } = Typography

const LoginForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { loading, error, token } = useSelector((state) => state.auth)

    const [formError, setFormError] = useState(null)

    // Show error message when login fails
    useEffect(() => {
        if (error) {
            setFormError(error)
            message.error(error) // optional toast
        }
    }, [error])

    // Redirect to dashboard if login successful
    useEffect(() => {
        if (token) navigate('/dashboard')
    }, [token, navigate])

    const onFinish = (values) => {
        dispatch(loginUser(values))
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

            {/* Login Form */}
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
                        name="login"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        layout="vertical"
                    >
                        {/* Server error alert */}
                        {formError && (
                            <Alert
                                message={formError}
                                type="error"
                                showIcon
                                style={{ marginBottom: 16 }}
                            />
                        )}

                        <Form.Item
                            name="username"
                            label="Username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Username!',
                                },
                            ]}
                        >
                            <Input
                                prefix={<UserOutlined />}
                                placeholder="Username"
                            />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Password!',
                                },
                            ]}
                        >
                            <Input.Password
                                prefix={<LockOutlined />}
                                placeholder="Password"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Checkbox>Remember me</Checkbox>
                            <a
                                href="#"
                                style={{ float: 'right' }}
                            >
                                Forgot password?
                            </a>
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                block
                                loading={loading}
                            >
                                Log in
                            </Button>
                            <Text
                                style={{
                                    display: 'block',
                                    textAlign: 'center',
                                    marginTop: 16,
                                }}
                            >
                                Don't have an account?{' '}
                                <a href="/signup">Register now</a>
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
        </div>
    )
}

export default LoginForm
