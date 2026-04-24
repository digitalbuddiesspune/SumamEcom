import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Heart,
  LogOut,
  Mail,
  MapPin,
  Phone,
  Save,
  ShoppingBag,
  Truck,
  UserRound,
} from 'lucide-react'
import { API_BASE_URL } from '../config/api'
import { useAuth } from '../context/authStore'

function ProfilePage() {
  const { token, user, fetchProfile, setUser, logout } = useAuth()
  const [form, setForm] = useState({ fullName: '', phone: '', address: '' })
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const load = async () => {
      try {
        const profile = await fetchProfile()
        if (profile) {
          setForm({
            fullName: profile.fullName || '',
            phone: profile.phone || '',
            address: profile.address || '',
          })
        }
      } catch (err) {
        setError(err.message)
      }
    }
    load()
  }, [fetchProfile])

  const onSubmit = async (event) => {
    event.preventDefault()
    setMessage('')
    setError('')
    try {
      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Profile update failed.')
      setUser({ ...user, ...data })
      setMessage('Profile updated successfully.')
    } catch (err) {
      setError(err.message)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <main className="page-section">
      <div className="container profile-shell">
        <aside className="profile-summary-card">
          <div className="profile-avatar">
            <UserRound size={30} />
          </div>
          <h1>My Profile</h1>
          <p className="muted page-copy">
            Manage your personal details and delivery information for faster checkout.
          </p>
          <div className="profile-summary-list">
            <div>
              <Mail size={16} />
              <span>{user?.email || 'No email'}</span>
            </div>
            <div>
              <Phone size={16} />
              <span>{form.phone || 'Phone not added'}</span>
            </div>
            <div>
              <MapPin size={16} />
              <span>{form.address || 'Address not added'}</span>
            </div>
          </div>
          <div className="profile-shortcuts">
            <Link to="/orders" className="profile-shortcut">
              <Truck size={16} />
              <span>Orders</span>
            </Link>
            <Link to="/wishlist" className="profile-shortcut">
              <Heart size={16} />
              <span>Wishlist</span>
            </Link>
            <Link to="/cart" className="profile-shortcut">
              <ShoppingBag size={16} />
              <span>Cart</span>
            </Link>
            <Link to="/orders" className="profile-shortcut">
              <Truck size={16} />
              <span>Track Orders</span>
            </Link>
          </div>
        </aside>

        <section className="profile-form-card">
          <header className="profile-form-head">
            <h2>Account Information</h2>
            <p className="muted">Keep your profile up to date for a better shopping experience.</p>
          </header>

          {error ? <p className="error-text">{error}</p> : null}
          {message ? <p className="success-text">{message}</p> : null}

          <form onSubmit={onSubmit} className="form-stack profile-form">
            <label>
              <span>Full name</span>
              <input
                type="text"
                placeholder="Enter full name"
                value={form.fullName}
                onChange={(e) => setForm((prev) => ({ ...prev, fullName: e.target.value }))}
                required
              />
            </label>
            <label>
              <span>Email</span>
              <input type="email" value={user?.email || ''} disabled />
            </label>
            <label>
              <span>Phone number</span>
              <input
                type="text"
                placeholder="Enter phone number"
                value={form.phone}
                onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
              />
            </label>
            <label className="form-span-2">
              <span>Address</span>
              <textarea
                rows="4"
                placeholder="Enter your complete address"
                value={form.address}
                onChange={(e) => setForm((prev) => ({ ...prev, address: e.target.value }))}
              />
            </label>
            <div className="profile-action-row form-span-2">
              <button type="submit" className="btn primary profile-btn">
                <Save size={16} />
                Save Changes
              </button>
              <button type="button" className="btn secondary profile-btn" onClick={handleLogout}>
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  )
}

export default ProfilePage
