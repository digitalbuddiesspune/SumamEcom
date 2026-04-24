import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Heart, ListOrdered, Search, ShoppingBag, UserRound } from 'lucide-react'
import { useAuth } from '../../context/authStore'

const navLinks = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'about', label: 'About', href: '/about' },
  { id: 'contact', label: 'Contact', href: '/contact' },
]

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <div className="nav-left">
          <Link to="/" className="brand">
            <span className="brand-badge">S</span>
            <span>Brandname</span>
          </Link>

          <button type="button" className="category-btn">
            Categories
          </button>
        </div>

        <button
          type="button"
          className="menu-toggle"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`site-nav ${menuOpen ? 'open' : ''}`} aria-label="Main navigation">
          <nav className="nav-links">
            {navLinks
              .filter((link) => !(link.href === '/' && location.pathname === '/'))
              .map((link) => (
              <NavLink key={link.id} to={link.href} onClick={() => setMenuOpen(false)}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          <form className="nav-search" role="search">
            <Search aria-hidden="true" className="nav-search-icon" size={16} />
            <input type="text" placeholder="Find product" />
            <button type="submit" aria-label="Search products">
              <Search aria-hidden="true" className="nav-search-submit-icon" size={16} />
            </button>
          </form>

          <div className="quick-actions">
            <NavLink to="/orders" className="quick-action" onClick={() => setMenuOpen(false)}>
              <ListOrdered aria-hidden="true" className="nav-icon" strokeWidth={1.9} />
              <span>Orders</span>
            </NavLink>
            <NavLink to="/wishlist" className="quick-action" onClick={() => setMenuOpen(false)}>
              <Heart aria-hidden="true" className="nav-icon" strokeWidth={1.9} />
              <span>Saved</span>
            </NavLink>
            <NavLink to="/cart" className="quick-action" onClick={() => setMenuOpen(false)}>
              <ShoppingBag aria-hidden="true" className="nav-icon" strokeWidth={1.9} />
              <span>My cart</span>
            </NavLink>
            {isAuthenticated ? (
              <NavLink to="/profile" className="quick-action" onClick={() => setMenuOpen(false)}>
                <UserRound aria-hidden="true" className="nav-icon" strokeWidth={1.9} />
                <span>Profile</span>
              </NavLink>
            ) : (
              <NavLink to="/login" className="quick-action" onClick={() => setMenuOpen(false)}>
                <UserRound aria-hidden="true" className="nav-icon" strokeWidth={1.9} />
                <span>Sign in</span>
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
