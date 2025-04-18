import { Layout, Typography } from 'antd'
import React from 'react'

const { Title, Text } = Typography
const { Header, Content, Footer } = Layout

const Dashboard = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ backgroundColor: '#576feb', padding: '0 24px' }}>
        <Title
          level={3}
          style={{ color: '#fff', lineHeight: '64px', margin: 0 }}
        >
          Osly Dashboard
        </Title>
      </Header>
      <Content style={{ padding: 24 }}>
        <Title level={4}>Welcome to the Dashboard</Title>
        <Text>This is a protected page after login/signup.</Text>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        © {new Date().getFullYear()} Osly. All rights reserved.
      </Footer>
    </Layout>
  )
}

export default Dashboard
