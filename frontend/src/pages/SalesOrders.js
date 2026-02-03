import { useEffect, useState, useCallback } from "react";
import {
  getSalesOrders,
  createSalesOrder,
  getCustomers,
  getProducts,
} from "../services/api";

function SalesOrders({ token }) {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);

  const [customer, setCustomer] = useState("");
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");

  const loadData = useCallback(async () => {
    try {
      const ordersData = await getSalesOrders(token);
      const customersData = await getCustomers(token);
      const productsData = await getProducts(token);

      // orders
      setOrders(Array.isArray(ordersData) ? ordersData : ordersData || []);

      // customers
      if (Array.isArray(customersData)) {
        setCustomers(customersData);
      } else if (Array.isArray(customersData.customers)) {
        setCustomers(customersData.customers);
      } else {
        setCustomers([]);
      }

      // products (IMPORTANT FIX)
      if (Array.isArray(productsData)) {
        setProducts(productsData);
      } else if (Array.isArray(productsData.products)) {
        setProducts(productsData.products);
      } else {
        setProducts([]);
      }

    } catch (err) {
      console.log("Load error:", err);
    }
  }, [token]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleCreate = async () => {
    if (!customer || !product || !quantity) {
      alert("Select customer, product and quantity");
      return;
    }

    try {
      await createSalesOrder(
        {
          customer,
          items: [{ product, quantity: Number(quantity) }],
        },
        token
      );

      setCustomer("");
      setProduct("");
      setQuantity("");
      loadData();
    } catch (err) {
      console.log(err);
      alert("Failed to create sales order");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Sales Orders</h2>

      <h3>Create Sales Order</h3>

      <select value={customer} onChange={(e) => setCustomer(e.target.value)}>
        <option value="">Select Customer</option>
        {customers.map((c) => (
          <option key={c._id} value={c._id}>
            {c.name}
          </option>
        ))}
      </select>

      <select value={product} onChange={(e) => setProduct(e.target.value)}>
        <option value="">Select Product</option>
        {products.map((p) => (
          <option key={p._id} value={p._id}>
            {p.name}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />

      <button onClick={handleCreate}>Create</button>

      <h3>Sales Orders List</h3>

      {orders.map((o) => (
        <div key={o._id} style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
          <p><b>Customer:</b> {o.customer?.name}</p>
          <p><b>Total:</b> ₹{o.totalAmount}</p>
        </div>
      ))}
    </div>
  );
}

export default SalesOrders;