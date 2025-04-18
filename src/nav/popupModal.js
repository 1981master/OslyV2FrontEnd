import { Input, Modal } from 'antd'
import React, { useState } from 'react'

const PopupModal = ({ visible, onClose, title, content, onCodeSubmit }) => {
  const [code, setCode] = useState('')

  const handleOk = () => {
    if (code.trim() === '') return
    onCodeSubmit(code)
    setCode('')
  }

  const handleCancel = () => {
    setCode('')
    onClose()
  }

  return (
    <Modal
      open={visible}
      title={title}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Verify"
    >
      <p>{content}</p>
      <Input
        placeholder="Enter verification code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
    </Modal>
  )
}

export default PopupModal
