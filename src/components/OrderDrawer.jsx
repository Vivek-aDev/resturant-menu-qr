import { supabase } from "../lib/supabase";

export default function OrderDrawer({
  items,
  table,
  closeDrawer,
  addItem,
  removeItem,
  clearCart
}) {

  const totalItems = items.reduce(
    (sum, i) => sum + i.qty,
    0
  );

  const sendOrder = async () => {

    if (!items.length) return;

    const { error } = await supabase
      .from("orders")
      .insert([
        {
          table_number: table,
          items: items
        }
      ]);

    if (error) {
      alert("Order failed. Try again.");
      return;
    }

    alert("Order sent to waiter");

    clearCart();   // reset cart
    closeDrawer(); // close drawer
  };

  return (
    <>
      <div
        className="drawer-overlay"
        onClick={closeDrawer}
      ></div>

      <div className="drawer">

        <div className="drawer-header">
          <h3>
            Your Order {table && `(Table ${table})`}
          </h3>

          <button onClick={closeDrawer}>
            Close
          </button>
        </div>

        <div className="drawer-items">

          {items.length === 0 && (
            <p className="empty">
              Cart is empty
            </p>
          )}

          {items.map((item) => (
            <div
              className="drawer-item"
              key={item.name}
            >

              <span>{item.name}</span>

              <div className="qty-controls">

                <button
                  className="qty-btn"
                  onClick={() => removeItem(item)}
                >
                  -
                </button>

                <span>{item.qty}</span>

                <button
                  className="qty-btn"
                  onClick={() => addItem(item)}
                >
                  +
                </button>

              </div>

            </div>
          ))}

        </div>

        <button
          className="send-order"
          onClick={sendOrder}
          disabled={!items.length}
        >
          Place Order ({totalItems})
        </button>

      </div>
    </>
  );
}