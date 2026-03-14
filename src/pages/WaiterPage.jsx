import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function WaiterPage() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();

    const channel = supabase
      .channel("orders")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "orders",
        },
        (payload) => {
          setOrders((prev) => [
            payload.new,
            ...prev
          ]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };

  }, []);

  const fetchOrders = async () => {

    const { data } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    setOrders(data || []);
  };

  return (
    <div style={{ padding: 20 }}>

      <h2>Kitchen Orders</h2>

      {orders.map((order) => (
        <div
          key={order.id}
          style={{
            border: "1px solid #ddd",
            padding: 12,
            marginBottom: 12
          }}
        >

          <h3>Table {order.table_number}</h3>

          {order.items.map((item) => (
            <p key={item.name}>
              {item.name} x{item.qty}
            </p>
          ))}

        </div>
      ))}

    </div>
  );
}