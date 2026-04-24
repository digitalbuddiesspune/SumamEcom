function CategorySection({ categories }) {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <h2>Shop by Category</h2>
        </div>
        <div className="responsive-grid cols-4">
          {categories.length === 0 ? (
            <article className="placeholder-card wide">
              <h3>No categories yet</h3>
              <p>Categories will be rendered from backend response.</p>
            </article>
          ) : (
            categories.map((category) => (
              <article key={category.id} className="placeholder-card">
                <h3>{category.name}</h3>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  )
}

export default CategorySection
