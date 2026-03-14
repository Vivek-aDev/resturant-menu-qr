import { useState } from "react";
import menu from "../data/menu.json";
import { useSearchParams } from "react-router-dom";

import DishCard from "../components/DishCard";
import FloatingCart from "../components/FloatingCart";
import OrderDrawer from "../components/OrderDrawer";

export default function MenuPage() {
  const [type, setType] = useState("veg");
  const [activeCategory, setActiveCategory] = useState(menu.categories[0].name);

  const [orderItems, setOrderItems] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [searchParams] = useSearchParams();
  const table = searchParams.get("table");

  // Filter items by veg / nonveg
  const filteredCategories = menu.categories.map((cat) => ({
    ...cat,
    items: cat.items.filter((i) => i.type === type),
  }));

  // Add item to cart
  const addItem = (item) => {
    setOrderItems((prev) => {
      const existing = prev.find((i) => i.name === item.name);

      if (existing) {
        return prev.map((i) =>
          i.name === item.name ? { ...i, qty: i.qty + 1 } : i
        );
      }

      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeItem = (item) => {
    setOrderItems((prev) => {
      const existing = prev.find((i) => i.name === item.name);

      if (!existing) return prev;

      if (existing.qty === 1) {
        return prev.filter((i) => i.name !== item.name);
      }

      return prev.map((i) =>
        i.name === item.name ? { ...i, qty: i.qty - 1 } : i
      );
    });
  };

  const clearCart = () => {
    setOrderItems([]);
  };

  return (
    <div className="menu-container">
      {/* HEADER */}

      <header className="header">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png"
          alt="logo"
        />

        <div>
          <h2>{menu.restaurant}</h2>

          {table && <p className="table">Table {table}</p>}
        </div>
      </header>

      {/* VEG NON VEG TOGGLE */}

      <div className="toggle">
        <button
          className={type === "veg" ? "active veg" : "veg"}
          onClick={() => {
            setType("veg");
            setActiveCategory(menu.categories[0].name);
          }}
        >
          Veg
        </button>

        <button
          className={type === "nonveg" ? "active nonveg" : "nonveg"}
          onClick={() => {
            setType("nonveg");
            setActiveCategory(menu.categories[0].name);
          }}
        >
          Non Veg
        </button>
      </div>

      {/* CATEGORY TABS */}

      <div className="tabs">
        {filteredCategories.map((cat) => (
          <button
            key={cat.name}
            className={activeCategory === cat.name ? "tab active-tab" : "tab"}
            onClick={() => setActiveCategory(cat.name)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* MENU ITEMS */}

      <div className="menu">
        {filteredCategories.map((cat) => {
          if (cat.name !== activeCategory) return null;

          return (
            <div key={cat.name}>
              {cat.items.length === 0 ? (
                <p className="empty">No items available</p>
              ) : (
                cat.items.map((item) => (
                  <DishCard
                    key={item.name}
                    item={item}
                    orderItems={orderItems}
                    addItem={addItem}
                    removeItem={removeItem}
                  />
                ))
              )}
            </div>
          );
        })}
      </div>

      {/* FLOATING CART */}

      <FloatingCart items={orderItems} openDrawer={() => setDrawerOpen(true)} />

      {/* ORDER DRAWER */}

      {drawerOpen && (
        <OrderDrawer
          items={orderItems}
          table={table}
          closeDrawer={() => setDrawerOpen(false)}
          addItem={addItem}
          removeItem={removeItem}
          clearCart={clearCart}
        />
      )}
    </div>
  );
}
