function HeroSection() {
  return (
    <section className="hero-section">
      <div className="container hero-grid">
        <div>
          <p className="eyebrow">Modern Saree Collection</p>
          <h1>Graceful designs crafted for every celebration</h1>
          <p className="muted">
            Frontend structure is ready. Data cards, categories, and dynamic banners can be
            connected once APIs are available.
          </p>
          <div className="hero-actions">
            <button type="button" className="btn primary">
              Shop Collection
            </button>
            <button type="button" className="btn secondary">
              Track Orders
            </button>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="hero-glow" />
        </div>
      </div>
    </section>
  )
}

export default HeroSection
