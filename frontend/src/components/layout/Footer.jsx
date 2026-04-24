import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <h3>Sumam Sarees</h3>
          <p className="muted">
            Elegant saree storefront UI foundation, built responsive and backend-ready.
          </p>
        </div>
        <div>
          <h4>Quick Links</h4>
          <ul className="footer-list">
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4>Support</h4>
          <ul className="footer-list">
            <li>
              <Link to="/cart">Cart</Link>
            </li>
            <li>
              <Link to="/wishlist">Wishlist</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <p className="muted">© {new Date().getFullYear()} Sumam Sarees. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
