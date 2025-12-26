import {
    Button,
    Card,
    Form,
    Input,
    InputNumber,
    Modal,
    Upload,
    message,
} from 'antd'
import { useEffect, useState } from 'react'
import { EmailVerification } from './EmailVerification'
import PopupModal from './PopupModal'

const { Meta } = Card

const ProductCard = ({ product, onUpdatePrice, onVerifyEmail }) => {
    return (
        <Card
            hoverable
            cover={
                <img
                    src={product.imageUrl || product.image || ''}
                    alt={product.name || 'Product'}
                    style={{
                        width: '100%',
                        height: '200px',
                        objectFit: 'cover',
                    }}
                />
            }
            actions={[
                <Button
                    type="primary"
                    onClick={() => onUpdatePrice(product.id, product.price)}
                >
                    Edit Price
                </Button>,
                <Button onClick={() => onVerifyEmail(product)}>
                    Verify Email
                </Button>,
            ]}
        >
            <Meta
                title={`${product.name} - $${product.price}`}
                description={product.description}
            />
        </Card>
    )
}

const ProductDashboard = () => {
    const [products, setProducts] = useState([])
    const [isAddModalVisible, setIsAddModalVisible] = useState(false)
    const [form] = Form.useForm()
    const [stores, setStores] = useState([])
    const [categories, setCategories] = useState([])
    const [newProduct, setNewProduct] = useState({
        name: '',
        barcode: '',
        description: '',
        boughtPrice: '',
        sellPrice: '',
        quantity: '',
        store: '',
        category: '',
        image: '',
    })
    const [isVerificationModalVisible, setVerificationModalVisible] =
        useState(false)
    const [selectedProduct, setSelectedProduct] = useState(null)

    useEffect(() => {
        fetch('http://localhost:8080/api/products')
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((err) => console.error('Error fetching products:', err))

        fetch('http://localhost:8080/api/stores')
            .then((res) => res.json())
            .then((data) => setStores(data))
            .catch((err) => console.error('Error fetching stores:', err))

        fetch('http://localhost:8080/api/categories')
            .then((res) => res.json())
            .then((data) => setCategories(data))
            .catch((err) => console.error('Error fetching categories:', err))
    }, [])

    const handleAddProduct = async () => {
        try {
            const {
                name,
                barcode,
                description,
                boughtPrice,
                sellPrice,
                quantity,
                store,
                category,
                image,
            } = newProduct

            if (
                !name ||
                !barcode ||
                !description ||
                !boughtPrice ||
                !sellPrice ||
                !quantity ||
                !store ||
                !category ||
                !image
            ) {
                message.error('Please fill in all required fields.')
                return
            }

            const response = await fetch('http://localhost:8080/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    barcode,
                    description,
                    boughtPrice: parseFloat(boughtPrice),
                    sellPrice: parseFloat(sellPrice),
                    quantity: parseInt(quantity),
                    image,
                    store: { name: store },
                    category: { name: category },
                }),
            })

            if (!response.ok) {
                const errorText = await response.text()
                throw new Error(`Failed to add product: ${errorText}`)
            }

            const savedProduct = await response.json()
            setProducts((prev) => [...prev, savedProduct])
            message.success('Product added successfully')
            form.resetFields()
            setNewProduct({
                name: '',
                barcode: '',
                description: '',
                boughtPrice: '',
                sellPrice: '',
                quantity: '',
                store: '',
                category: '',
                image: '',
            })
            setIsAddModalVisible(false)
        } catch (err) {
            console.error('Error:', err)
            message.error(err.message)
        }
    }

    const resizeImage = (file) => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        const img = new Image()

        img.onload = () => {
            canvas.width = img.width / 4
            canvas.height = img.height / 4
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
            const resizedBase64 = canvas.toDataURL('image/png')

            setNewProduct((prev) => ({
                ...prev,
                image: resizedBase64,
            }))
        }

        img.src = URL.createObjectURL(file)
        return false
    }

    const handleImageChange = (file) => resizeImage(file)

    const handleEmailVerification = async (product) => {
        try {
            setSelectedProduct(product)
            setVerificationModalVisible(true)
            const response = await EmailVerification({ productId: product.id })
            if (response.status === 200) {
                message.success('Verification email sent!')
            } else {
                message.error('Failed to send verification email')
            }
        } catch (err) {
            console.error(err)
            message.error('Error sending verification email')
        }
    }

    const handleCodeSubmit = (code) => {
        message.success(`Code ${code} submitted for ${selectedProduct?.name}`)
        setVerificationModalVisible(false)
    }

    return (
        <>
            <Button
                type="dashed"
                onClick={() => setIsAddModalVisible(true)}
                style={{ marginBottom: 16 }}
            >
                + Add New Product
            </Button>

            {/* CSS Grid container */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns:
                        'repeat(auto-fill, minmax(250px, 1fr))',
                    gap: '16px',
                }}
            >
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onUpdatePrice={(id, price) =>
                            setProducts((prev) =>
                                prev.map((p) =>
                                    p.id === id ? { ...p, price } : p,
                                ),
                            )
                        }
                        onVerifyEmail={handleEmailVerification}
                    />
                ))}
            </div>

            <Modal
                title="Add New Product"
                open={isAddModalVisible}
                onCancel={() => setIsAddModalVisible(false)}
                onOk={handleAddProduct}
            >
                <Form
                    form={form}
                    layout="vertical"
                >
                    <Form.Item
                        name="name"
                        label="Product Name"
                        rules={[{ required: true }]}
                    >
                        <Input
                            value={newProduct.name}
                            onChange={(e) =>
                                setNewProduct({
                                    ...newProduct,
                                    name: e.target.value,
                                })
                            }
                        />
                    </Form.Item>
                    <Form.Item
                        name="barcode"
                        label="Barcode"
                        rules={[{ required: true }]}
                    >
                        <Input
                            value={newProduct.barcode}
                            onChange={(e) =>
                                setNewProduct({
                                    ...newProduct,
                                    barcode: e.target.value,
                                })
                            }
                        />
                    </Form.Item>
                    <Form.Item
                        name="image"
                        label="Upload Image"
                    >
                        <Upload
                            beforeUpload={handleImageChange}
                            accept="image/*"
                            maxCount={1}
                        >
                            <Button>Select Image</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Description"
                    >
                        <Input
                            value={newProduct.description}
                            onChange={(e) =>
                                setNewProduct({
                                    ...newProduct,
                                    description: e.target.value,
                                })
                            }
                        />
                    </Form.Item>
                    <Form.Item
                        name="boughtPrice"
                        label="Bought Price"
                    >
                        <InputNumber
                            prefix="$"
                            value={newProduct.boughtPrice}
                            min={0}
                            style={{ width: '100%' }}
                            onChange={(val) =>
                                setNewProduct({
                                    ...newProduct,
                                    boughtPrice: val,
                                })
                            }
                        />
                    </Form.Item>
                    <Form.Item
                        name="sellPrice"
                        label="Sell Price"
                    >
                        <InputNumber
                            prefix="$"
                            value={newProduct.sellPrice}
                            min={0}
                            style={{ width: '100%' }}
                            onChange={(val) =>
                                setNewProduct({ ...newProduct, sellPrice: val })
                            }
                        />
                    </Form.Item>
                    <Form.Item
                        name="quantity"
                        label="Quantity"
                    >
                        <InputNumber
                            value={newProduct.quantity}
                            min={0}
                            style={{ width: '100%' }}
                            onChange={(val) =>
                                setNewProduct({ ...newProduct, quantity: val })
                            }
                        />
                    </Form.Item>
                    <Form.Item
                        name="store"
                        label="Store Name"
                    >
                        <Input
                            value={newProduct.store}
                            onChange={(e) =>
                                setNewProduct({
                                    ...newProduct,
                                    store: e.target.value,
                                })
                            }
                        />
                    </Form.Item>
                    <Form.Item
                        name="category"
                        label="Category Name"
                    >
                        <Input
                            value={newProduct.category}
                            onChange={(e) =>
                                setNewProduct({
                                    ...newProduct,
                                    category: e.target.value,
                                })
                            }
                        />
                    </Form.Item>
                </Form>
            </Modal>

            <PopupModal
                visible={isVerificationModalVisible}
                onClose={() => setVerificationModalVisible(false)}
                title="Enter Verification Code"
                content={`Please enter the code sent for ${selectedProduct?.name}`}
                onCodeSubmit={handleCodeSubmit}
            />
        </>
    )
}

export default ProductDashboard
