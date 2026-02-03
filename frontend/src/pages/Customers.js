import { useEffect, useState } from "react";
import { getCustomers, createCustomer, deleteCustomer } from "../services/api";

function Customers({ token }) {
  const [customers, setCustomers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const loadCustomers = async () => {
    try {
      const data = await getCustomers(token);
      setCustomers(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
  const loadCustomers = async () => {
    try {
      const data = await getCustomers(token);
      setCustomers(data);
    } catch (err) {
      console.log(err);
    }
  };

  loadCustomers();
}, [token]);
  const handleAdd = async () => {
    try {
      await createCustomer({ name, email, phone, address }, token);
      setName("");
      setEmail("");
      setPhone("");
      setAddress("");
      loadCustomers();
    } catch (err) {
      alert("Failed to add customer");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCustomer(id, token);
      loadCustomers();
    } catch (err) {
      alert("Failed to delete customer");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Customers</h2>

      {/* ADD CUSTOMER */}
      <div style={{ border: "2px solid black", padding: "15px", marginBottom: "20px", borderRadius: "8px" }}>
        <h3>Add Customer</h3>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <input placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
          <button onClick={handleAdd}>Add</button>
        </div>
      </div>

      {/* CUSTOMER LIST */}
      <h3>Customer List</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "15px" }}>
        {customers.map((c) => (
          <div
            key={c._id}
            style={{
              border: "2px solid black",
              padding: "12px",
              borderRadius: "8px",
            }}
          >
            <p><b>Name:</b> {c.name}</p>
<p><b>Email:</b> {c.email}</p>
<p><b>Phone:</b> {c.phone}</p>
<p><b>Address:</b> {c.address}</p>
<p><b>Customer ID:</b> {c._id}</p>   {/* 👈 ADD THIS */}
<button onClick={() => handleDelete(c._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Customers;