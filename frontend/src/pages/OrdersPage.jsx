import { useState } from 'react'
import { Package, Truck } from 'lucide-react'

function OrdersPage() {
  const [orderId, setOrderId] = useState('')

  return (
    <main className="page-section">
      <div className="container">
        <h1>Track Orders</h1>
        <p className="muted page-copy">
          Enter your order ID to track delivery status. Order history will appear here as backend
          order APIs are connected.
        </p>

        <section className="orders-track-card">
          <div className="orders-track-head">
            <Truck size={18} />
            <h2>Track your order</h2>
          </div>
          <form className="orders-track-form" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Enter Order ID (e.g. SUM12345)"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
            />
            <button type="submit" className="btn primary">
              Track
            </button>
          </form>
        </section>

        <section className="orders-history-card">
          <div className="orders-track-head">
            <Package size={18} />
            <h2>Order History</h2>
          </div>
          <article className="placeholder-card">
            <h3>No orders yet</h3>
            <p>Your placed orders and delivery timeline will appear here.</p>
          </article>
        </section>
      </div>
    </main>
  )
}

export default OrdersPage
