import { Button } from 'antd'
import React, { useEffect, useState } from 'react'
import './App.css'

function Oslee() {
  const [items, setItems] = useState([])

  useEffect(() => {
    fetch('http://localhost:8082/llogin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: 'MOHMMED', password: '1981' }),
      credentials: 'include', // if using cookies/session
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .then((data) => setItems(data))
      .catch((err) => console.error('Error:', err))
  }, [])

  return (
    <div className="App">
      <Button type="primary">Primary Button</Button>
      <p>Besm ALAH</p>
      <p>{items}</p>
    </div>
  )
}

export default Oslee
