export default function DishCard({
    item,
    orderItems,
    addItem,
    removeItem,
  }) {
  
    const existing = orderItems.find(
      (i) => i.name === item.name
    );
  
    return (
      <div className="dish-card">
  
        <img
          src={item.image}
          alt={item.name}
        />
  
        <div className="dish-info">
  
          <h4>{item.name}</h4>
  
          <p className="price">₹{item.price}</p>
  
          {!existing ? (
  
            <button
              className="add-btn"
              onClick={() => addItem(item)}
            >
              Add
            </button>
  
          ) : (
  
            <div className="qty-controls">
  
              <button
                className="qty-btn"
                onClick={() => removeItem(item)}
              >
                -
              </button>
  
              <span>{existing.qty}</span>
  
              <button
                className="qty-btn"
                onClick={() => addItem(item)}
              >
                +
              </button>
  
            </div>
  
          )}
  
        </div>
  
      </div>
    );
  }