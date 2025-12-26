import { Col, Layout, Row, Spin, Typography } from 'antd'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../store/actions/productAction'
import ProductCard from './ProductCard'

const { Title } = Typography
const { Header, Content, Footer } = Layout

const Dashboard = () => {
    const dispatch = useDispatch()
    const { data, loading } = useSelector((state) => state.products)

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

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
                {loading ? (
                    <Spin size="large" />
                ) : (
                    <Row gutter={[16, 16]}>
                        {data.map((product) => (
                            <Col
                                key={product.id}
                                xs={24}
                                sm={12}
                                md={8}
                                lg={6}
                            >
                                <ProductCard
                                    product={product}
                                    onEdit={(id) => console.log('Edit', id)}
                                />
                            </Col>
                        ))}
                    </Row>
                )}
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
