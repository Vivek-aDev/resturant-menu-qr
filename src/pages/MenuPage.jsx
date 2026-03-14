import { useState } from "react";
import menu from "../data/menu.json";
import { useSearchParams } from "react-router-dom";

export default function MenuPage() {
  const [type, setType] = useState("veg");
  const [activeCategory, setActiveCategory] = useState(menu.categories[0].name);
  const [searchParams] = useSearchParams();
  const table = searchParams.get("table");

  const filteredCategories = menu.categories.map((cat) => ({
    ...cat,
    items: cat.items.filter((i) => i.type === type),
  }));

  return (
    <div className="menu-container">
      <header className="header">
        <img src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png" />

        <div>
          <h2>{menu.restaurant}</h2>

          {table && <p className="table">Table {table}</p>}
        </div>
      </header>

      <div className="toggle">
        <button
          className={type === "veg" ? "active veg" : "veg"}
          onClick={() => setType("veg")}
        >
          Veg
        </button>

        <button
          className={type === "nonveg" ? "active nonveg" : "nonveg"}
          onClick={() => setType("nonveg")}
        >
          Non Veg
        </button>
      </div>

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

      <div className="menu">
        {filteredCategories.map((cat) => {
          if (cat.name !== activeCategory) return null;

          return (
            <div key={cat.name}>
              {cat.items.map((item) => (
                <div className="menu-item" key={item.name}>
                  <span>{item.name}</span>
                  <span>₹{item.price}</span>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
