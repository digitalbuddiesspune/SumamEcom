import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <main className="page-section auth-shell">
      <div className="auth-card">
        <h1>404</h1>
        <p className="muted page-copy">The page you are looking for does not exist.</p>
        <Link to="/" className="btn primary">
          Back to Home
        </Link>
      </div>
    </main>
  )
}

export default NotFoundPage
