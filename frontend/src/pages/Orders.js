import { useEffect, useState } from "react";
import { getOrders, updateOrderStatus, downloadInvoice } from "../services/api";

function Orders({ token }) {
  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
    try {
      const data = await getOrders(token);

      // 🔥 HARD SAFETY CHECK
      if (Array.isArray(data)) {
        setOrders(data);
      } else if (Array.isArray(data.orders)) {
        setOrders(data.orders);
      } else {
        setOrders([]);
      }

    } catch (error) {
      console.log("Load orders error:", error);
      alert("Failed to load orders");
      setOrders([]);
    }
  };

  useEffect(() => {
  const loadOrders = async () => {
    try {
      const data = await getOrders(token);

      if (Array.isArray(data)) {
        setOrders(data);
      } else if (Array.isArray(data.orders)) {
        setOrders(data.orders);
      } else {
        setOrders([]);
      }

    } catch (error) {
      console.log("Load orders error:", error);
      alert("Failed to load orders");
      setOrders([]);
    }
  };

  loadOrders();
}, [token]);
  const handleMarkShipped = async (id) => {
    try {
      await updateOrderStatus(id, "SHIPPED", token);
      loadOrders();
    } catch (error) {
      alert("Failed to update order");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Orders</h2>

      {orders.length === 0 && <p>No orders found</p>}

      {Array.isArray(orders) &&
        orders.map((order) => (
          <div
            key={order._id}
            style={{
              border: "2px solid black",
              margin: "15px 0",
              padding: "15px",
              borderRadius: "8px",
            }}
          >
            <p><b>Order ID:</b> {order._id}</p>
            <p><b>Customer:</b> {order.customerName}</p>
            <p><b>Status:</b> {order.status}</p>
            <p><b>Payment:</b> {order.paymentStatus}</p>
            <p><b>Total:</b> ₹{order.totalAmount}</p>

            <h4>Items:</h4>
            <ul>
              {order.items?.map((item, index) => (
                <li key={index}>
                  {item.product?.name} — Qty: {item.quantity} — ₹{item.price}
                </li>
              ))}
            </ul>

            <div style={{ marginTop: "10px" }}>
              {order.status !== "SHIPPED" && (
                <button onClick={() => handleMarkShipped(order._id)}>
                  Mark Shipped
                </button>
              )}

              <button
                onClick={() => downloadInvoice(order._id, token)}
                style={{ marginLeft: "10px" }}
              >
                Download Invoice
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Orders;