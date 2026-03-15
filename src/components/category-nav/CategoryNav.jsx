export default function CategoryNav({
    categories,
    activeCategory,
    setActiveCategory
  }) {
    return (
      <div className="category-nav">
  
        {categories.map((cat) => (
          <button
            key={cat.name}
            className={
              activeCategory === cat.name
                ? "cat active"
                : "cat"
            }
            onClick={() => setActiveCategory(cat.name)}
          >
            {cat.name}
          </button>
        ))}
  
      </div>
    );
  }