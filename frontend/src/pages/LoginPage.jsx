import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authStore'

function LoginPage() {
  const { login, loading } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  const redirectTo = location.state?.from || '/profile'

  const onSubmit = async (event) => {
    event.preventDefault()
    setError('')
    try {
      await login(form)
      navigate(redirectTo, { replace: true })
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <main className="page-section auth-shell">
      <div className="auth-card">
        <h1>Login</h1>
        <p className="muted page-copy">Access your profile, cart, and wishlist.</p>
        {error ? <p className="error-text">{error}</p> : null}
        <form onSubmit={onSubmit} className="form-stack">
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
            required
          />
          <button type="submit" className="btn primary" disabled={loading}>
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>
        <p className="muted">
          No account? <Link to="/register">Create one</Link>
        </p>
      </div>
    </main>
  )
}

export default LoginPage
