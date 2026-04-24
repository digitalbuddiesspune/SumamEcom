import { useEffect, useState } from 'react'
import { API_BASE_URL } from '../config/api'
import { useAuth } from '../context/authStore'

function WishlistPage() {
  const { token } = useAuth()
  const [items, setItems] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const loadWishlist = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/user/wishlist`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        const data = await response.json()
        if (!response.ok) throw new Error(data.message || 'Failed to load wishlist.')
        setItems(data)
      } catch (err) {
        setError(err.message)
      }
    }
    loadWishlist()
  }, [token])

  const removeItem = async (productId) => {
    const response = await fetch(`${API_BASE_URL}/user/wishlist/${productId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
    const data = await response.json()
    setItems(data)
  }

  return (
    <main className="page-section">
      <div className="container">
        <h1>My Wishlist</h1>
        <p className="muted page-copy">Save favorites and move them to cart later.</p>
        {error ? <p className="error-text">{error}</p> : null}
        {items.length === 0 ? (
          <article className="placeholder-card">
            <h3>Wishlist is empty</h3>
            <p>Your favorite sarees will appear here.</p>
          </article>
        ) : (
          <div className="list-stack">
            {items.map((item) => (
              <article className="placeholder-card row-card" key={item.productId}>
                <div>
                  <h3>{item.title || item.productId}</h3>
                  <p>Rs. {item.price}</p>
                </div>
                <button type="button" className="btn secondary" onClick={() => removeItem(item.productId)}>
                  Remove
                </button>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

export default WishlistPage
