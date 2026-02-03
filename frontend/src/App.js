import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";

import Login from "./pages/Login";
import Orders from "./pages/Orders";
import Inventory from "./pages/Inventory";
import Customers from "./pages/Customers";
import Suppliers from "./pages/Suppliers";
import Products from "./pages/Products";
import SalesOrders from "./pages/SalesOrders";

import "./App.css";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <Router>
      <div className="app-container">
        {/* NAVBAR */}
        <nav className="navbar">
          <h2>ERP System</h2>
          <div>
            <Link to="/orders">Orders</Link>
            <Link to="/inventory">Inventory</Link>
            <Link to="/customers">Customers</Link>
            <Link to="/suppliers">Suppliers</Link>
            <Link to="/products">Products</Link>
            <Link to="/sales-orders">Sales Orders</Link>

            <button
              onClick={() => {
                localStorage.removeItem("token");
                setToken("");
              }}
            >
              Logout
            </button>
          </div>
        </nav>

        {/* ROUTES */}
        <div className="page-container">
          <Routes>
            <Route path="/orders" element={<Orders token={token} />} />
            <Route path="/inventory" element={<Inventory token={token} />} />
            <Route path="/customers" element={<Customers token={token} />} />
            <Route path="/suppliers" element={<Suppliers token={token} />} />
            <Route path="/products" element={<Products token={token} />} />
            <Route path="/sales-orders" element={<SalesOrders token={token} />} />
            <Route path="*" element={<Orders token={token} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;