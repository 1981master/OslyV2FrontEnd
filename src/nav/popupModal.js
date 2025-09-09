import { Input, Modal } from 'antd'
import { useState, useEffect } from 'react'

const PopupModal = ({ visible, onClose, title, content, onCodeSubmit }) => {
  const [code, setCode] = useState('')

  // Reset code whenever modal is opened or closed
  useEffect(() => {
    if (!visible) setCode('')
  }, [visible])

  const handleOk = () => {
    if (onCodeSubmit) {
      if (code.trim() === '') return
      onCodeSubmit(code)
      setCode('')
    } else {
      onClose()
    }
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
      okText={onCodeSubmit ? 'Verify' : 'OK'}
    >
      <p>{content}</p>

      {onCodeSubmit && (
        <Input
          placeholder="Enter verification code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          style={{ marginTop: 16 }}
        />
      )}
    </Modal>
  )
}

export default PopupModal
