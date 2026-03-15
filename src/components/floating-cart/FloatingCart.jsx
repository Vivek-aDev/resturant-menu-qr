export default function FloatingCart({ items, openDrawer }) {

    if (!items.length) return null;
  
    const totalItems = items.reduce(
      (sum, i) => sum + i.qty,
      0
    );
  
    return (
      <div className="floating-cart" onClick={openDrawer}>
        <span>{totalItems} items</span>
        <span>View Order</span>
      </div>
    );
  }