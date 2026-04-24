import { useEffect, useState } from 'react'
import { API_BASE_URL } from '../config/api'
import { useAuth } from '../context/authStore'

function CartPage() {
  const { token } = useAuth()
  const [items, setItems] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const loadCart = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/user/cart`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        const data = await response.json()
        if (!response.ok) throw new Error(data.message || 'Failed to load cart.')
        setItems(data)
      } catch (err) {
        setError(err.message)
      }
    }
    loadCart()
  }, [token])

  const removeItem = async (productId) => {
    const response = await fetch(`${API_BASE_URL}/user/cart/${productId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
    const data = await response.json()
    setItems(data)
  }

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <main className="page-section">
      <div className="container">
        <h1>My Cart</h1>
        <p className="muted page-copy">Your selected sarees will appear here.</p>
        {error ? <p className="error-text">{error}</p> : null}
        {items.length === 0 ? (
          <article className="placeholder-card">
            <h3>Cart is empty</h3>
            <p>Add products when catalog APIs are connected.</p>
          </article>
        ) : (
          <div className="list-stack">
            {items.map((item) => (
              <article className="placeholder-card row-card" key={item.productId}>
                <div>
                  <h3>{item.title || item.productId}</h3>
                  <p>Qty: {item.quantity}</p>
                </div>
                <div>
                  <p>Rs. {item.price}</p>
                  <button type="button" className="btn secondary" onClick={() => removeItem(item.productId)}>
                    Remove
                  </button>
                </div>
              </article>
            ))}
            <article className="placeholder-card row-card">
              <h3>Total</h3>
              <p>Rs. {total.toFixed(2)}</p>
            </article>
          </div>
        )}
      </div>
    </main>
  )
}

export default CartPage
