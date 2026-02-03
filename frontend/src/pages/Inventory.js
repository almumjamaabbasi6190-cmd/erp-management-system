import { useEffect, useState, useCallback } from "react";
import { getInventory, updateStock, getInventoryLogs } from "../services/api";

function Inventory({ token }) {
  const [products, setProducts] = useState([]);
  const [logs, setLogs] = useState([]);
  const [productId, setProductId] = useState("");
  const [type, setType] = useState("IN");
  const [quantity, setQuantity] = useState("");

  const loadInventory = useCallback(async () => {
  const data = await getInventory(token);

  if (Array.isArray(data.products)) {
    setProducts(data.products);
  } else if (Array.isArray(data)) {
    setProducts(data);
  } else {
    setProducts([]);
  }
}, [token]);
  const loadLogs = useCallback(async () => {
    try {
      const data = await getInventoryLogs(token);
      setLogs(data.logs || data || []);
    } catch (err) {
      console.log(err);
      setLogs([]);
    }
  }, [token]);

  useEffect(() => {
    loadInventory();
    loadLogs();
  }, [loadInventory, loadLogs]);

  const handleUpdate = async () => {
    if (!productId || !quantity) {
      alert("Select product and quantity");
      return;
    }

    try {
      await updateStock(
        { productId, type, quantity: Number(quantity) },
        token
      );

      setQuantity("");
      loadInventory();
      loadLogs();
    } catch (err) {
      console.log(err);
      alert("Stock update failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Inventory</h2>

      {/* PRODUCTS */}
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {products.map((p) => (
          <div
            key={p._id}
            style={{
              border: "2px solid black",
              borderRadius: "10px",
              padding: "15px",
              width: "220px",
              textAlign: "center",
            }}
          >
            <h3>{p.name}</h3>
            <p><b>Stock:</b> {p.stock}</p>
          </div>
        ))}
      </div>

      {/* UPDATE STOCK */}
      <h3 style={{ marginTop: "30px" }}>Update Stock</h3>
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <select value={productId} onChange={(e) => setProductId(e.target.value)}>
          <option value="">Select product</option>
          {products.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name}
            </option>
          ))}
        </select>

        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="IN">IN</option>
          <option value="OUT">OUT</option>
        </select>

        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        <button onClick={handleUpdate}>Update</button>
      </div>

      {/* STOCK LOGS */}
      <h3 style={{ marginTop: "30px" }}>Stock Logs</h3>
      <div>
        {logs.map((log) => (
          <div
            key={log._id}
            style={{
              border: "1px solid gray",
              borderRadius: "6px",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <p><b>Product:</b> {log.product?.name}</p>
            <p><b>Type:</b> {log.type}</p>
            <p><b>Quantity:</b> {log.quantity}</p>
            <p><b>Date:</b> {new Date(log.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Inventory;