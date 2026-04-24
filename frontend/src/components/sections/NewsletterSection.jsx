function NewsletterSection() {
  return (
    <section className="newsletter">
      <div className="container newsletter-wrap">
        <div>
          <h2>Stay Updated</h2>
          <p className="muted">Email capture can be connected to backend service later.</p>
        </div>
        <form className="newsletter-form">
          <input type="email" placeholder="Enter your email" aria-label="Email address" />
          <button type="submit" className="btn primary">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  )
}

export default NewsletterSection
