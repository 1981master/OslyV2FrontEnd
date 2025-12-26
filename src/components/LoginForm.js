import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import { login } from './Login' // Import the login function

const { Title, Text } = Typography

const LoginForm = () => {
    const navigate = useNavigate()

    const onFinish = async (values) => {
        try {
            const response = await login(values) // Call the login API
            // console.log('Login success:', response.data)

            // Assuming the response contains the JWT token
            const token = response.data.token

            // Save the token to localStorage (or sessionStorage)
            localStorage.setItem('authToken', token)

            // Redirect to a protected page (e.g., dashboard)
            navigate('/dashboard')
        } catch (error) {
            console.error(
                'Login failed:',
                error.response?.data || error.message,
            )
            // Show error message to the user (optional)
            alert('Invalid credentials. Please try again.')
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
                            <a href="#">Forgot password?</a>
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                block
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
