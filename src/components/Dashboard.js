import { Layout, Typography } from 'antd'
import ProductCard from './ProductCard'

const { Title } = Typography
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

            <Content style={{ padding: '24px' }}>
                <ProductCard />
            </Content>

            <Footer
                style={{
                    textAlign: 'center',
                    backgroundColor: '#576feb',
                    color: '#fff',
                }}
            >
                © {new Date().getFullYear()} Osly. All rights reserved.
            </Footer>
        </Layout>
    )
}

export default Dashboard
