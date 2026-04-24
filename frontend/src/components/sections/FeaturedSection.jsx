function FeaturedSection({ featuredProducts }) {
  return (
    <section className="section alt">
      <div className="container">
        <div className="section-head">
          <h2>Featured Sarees</h2>
        </div>
        <div className="responsive-grid cols-3">
          {featuredProducts.length === 0 ? (
            <article className="placeholder-card wide">
              <h3>No featured products yet</h3>
              <p>Product cards are ready for backend data integration.</p>
            </article>
          ) : (
            featuredProducts.map((product) => (
              <article key={product.id} className="product-card">
                <div className="product-thumb" />
                <h3>{product.name}</h3>
                <p>{product.price}</p>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  )
}

export default FeaturedSection
