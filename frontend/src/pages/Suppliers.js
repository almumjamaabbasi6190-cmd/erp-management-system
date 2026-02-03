import { useEffect, useState } from "react";
import { getSuppliers, createSupplier, deleteSupplier } from "../services/api";

function Suppliers({ token }) {
  const [suppliers, setSuppliers] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const loadSuppliers = async () => {
    try {
      const data = await getSuppliers(token);
      setSuppliers(data.suppliers || []);
    } catch (err) {
      console.log(err);
      setSuppliers([]);
    }
  };

  useEffect(() => {
    loadSuppliers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const handleAdd = async () => {
    try {
      await createSupplier({ name, email, phone, address }, token);
      setName("");
      setEmail("");
      setPhone("");
      setAddress("");
      loadSuppliers();
    } catch (err) {
      console.log(err);
      alert("Error adding supplier");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteSupplier(id, token);
      loadSuppliers();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Suppliers</h2>

      <h3>Add Supplier</h3>
      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <input placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
      <button onClick={handleAdd}>Add</button>

      <h3>Supplier List</h3>

      {suppliers.length === 0 && <p>No suppliers</p>}

      {suppliers.map((s) => (
        <div key={s._id} style={{ border: "1px solid #333", margin: "10px", padding: "10px" }}>
          <b>{s.name}</b> — {s.phone}
          <br />
          {s.email} | {s.address}
          <br />
          <button onClick={() => handleDelete(s._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Suppliers;