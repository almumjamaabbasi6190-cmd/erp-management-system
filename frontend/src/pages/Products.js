import { useEffect, useState } from "react";
import { getProducts, createProduct, deleteProduct } from "../services/api";

function Products({ token }) {
  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts(token);

        if (Array.isArray(data)) {
          setProducts(data);
        } else if (Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          setProducts([]);
        }
      } catch (err) {
        console.log(err);
        setProducts([]);
      }
    };

    loadProducts();
  }, [token]);

  const handleAdd = async () => {
    if (!name || !sku || !price || !stock) {
      alert("All fields are required");
      return;
    }

    try {
      await createProduct(
        {
          name,
          sku,
          price: Number(price),
          stock: Number(stock),
        },
        token
      );

      setName("");
      setSku("");
      setPrice("");
      setStock("");

      const data = await getProducts(token);
      setProducts(data.products || data || []);
    } catch (err) {
      console.log(err);
      alert("Error adding product");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id, token);
      const data = await getProducts(token);
      setProducts(data.products || data || []);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Products</h2>

      <h3>Add Product</h3>
      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input placeholder="SKU" value={sku} onChange={(e) => setSku(e.target.value)} />
      <input placeholder="Price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
      <input placeholder="Stock" type="number" value={stock} onChange={(e) => setStock(e.target.value)} />
      <button onClick={handleAdd}>Add</button>

      <h3>Product List</h3>

      {products.map((p) => (
  <div
    key={p._id}
    style={{ border: "1px solid #333", margin: "10px", padding: "10px" }}
  >
    <p><b>Name:</b> {p.name}</p>
    <p><b>SKU:</b> {p.sku}</p>
    <p><b>Price:</b> ₹{p.price}</p>
    <p><b>Stock:</b> {p.stock ?? 0}</p>

    <p style={{ fontSize: "12px", color: "gray" }}>
      <b>Product ID:</b> {p._id}
    </p>

    <button onClick={() => handleDelete(p._id)}>Delete</button>
  </div>
))}
    </div>
  );
}

export default Products;