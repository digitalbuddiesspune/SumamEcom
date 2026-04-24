function ContactPage() {
  return (
    <main className="page-section">
      <div className="container">
        <h1>Contact Us</h1>
        <p className="muted page-copy">
          Reach our support team for order help, styling suggestions, or delivery questions.
        </p>
        <div className="card-grid">
          <article className="placeholder-card">
            <h3>Email</h3>
            <p>Support email will be served from backend settings.</p>
          </article>
          <article className="placeholder-card">
            <h3>Phone</h3>
            <p>Support phone will be served from backend settings.</p>
          </article>
        </div>
      </div>
    </main>
  )
}

export default ContactPage
