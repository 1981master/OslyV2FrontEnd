import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Upload,
  message,
} from 'antd'
import React, { useEffect, useState } from 'react'

const { Meta } = Card

const ProductCard = ({ product, onUpdatePrice }) => {
  console.log('Product Image:', product.image) // Log the product image to check the value

  return (
    <Card
      hoverable
      cover={
        <img
          src={`data:image/png;base64,${product.image || ''}`} // Use the base64 image if available
          alt={product.name || 'Product'}
          style={{
            width: '100%',
            height: 'auto',
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
    storeId: null,
    store: '',
    categoryId: null,
    category: '',
    image: '',
  })

  useEffect(() => {
    // Fetch existing products (optional)
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

      setNewProduct({
        name: '',
        barcode: '',
        description: '',
        boughtPrice: '',
        sellPrice: '',
        quantity: '',
        storeId: null,
        store: '',
        categoryId: null,
        category: '',
        image: '',
      })
      form.resetFields()
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
      // Resize the image (half the size)
      canvas.width = img.width / 4
      canvas.height = img.height / 4
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      const resizedBase64 = canvas.toDataURL('image/png')

      // Set the resized image
      setNewProduct((prev) => ({
        ...prev,
        image: resizedBase64,
      }))
    }

    img.src = URL.createObjectURL(file)
    return false // Prevent default upload action
  }

  const handleImageChange = (file) => {
    // Use resizeImage function to handle image resizing
    return resizeImage(file)
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

      <Row gutter={[16, 16]}>
        {products &&
          products.map((product) => (
            <Col
              key={product.id}
              xs={24}
              sm={12}
              md={8}
              lg={6}
            >
              <ProductCard
                product={product}
                onUpdatePrice={(id, price) =>
                  setProducts((prev) =>
                    prev.map((p) => (p.id === id ? { ...p, price } : p)),
                  )
                }
              />
            </Col>
          ))}
      </Row>

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
            rules={[{ required: true, message: 'Enter product name' }]}
          >
            <Input
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
          </Form.Item>

          <Form.Item
            name="barcode"
            label="Barcode"
            rules={[{ required: true, message: 'Enter barcode' }]}
          >
            <Input
              value={newProduct.barcode}
              onChange={(e) =>
                setNewProduct({ ...newProduct, barcode: e.target.value })
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
                setNewProduct({ ...newProduct, description: e.target.value })
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
                setNewProduct({ ...newProduct, boughtPrice: val })
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
                setNewProduct({ ...newProduct, store: e.target.value })
              }
              placeholder="Enter store name"
            />
          </Form.Item>

          <Form.Item
            name="category"
            label="Category Name"
          >
            <Input
              value={newProduct.category}
              onChange={(e) =>
                setNewProduct({ ...newProduct, category: e.target.value })
              }
              placeholder="Enter category name"
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default ProductDashboard
