import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// ================= AUTH =================
export const loginUser = async (email, password) => {
  const res = await API.post("/auth/login", { email, password });
  return res.data;
};

// ================= ORDERS =================
export const getOrders = async (token) => {
  const res = await API.get("/orders", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updateOrderStatus = async (id, status, token) => {
  const res = await API.put(
    `/orders/${id}/status`,
    { status },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

export const downloadInvoice = async (id, token) => {
  const res = await API.get(`/orders/${id}/invoice`, {
    headers: { Authorization: `Bearer ${token}` },
    responseType: "blob",
  });
  return res.data;
};

// ================= INVENTORY =================
export const getInventory = async (token) => {
  const res = await API.get("/inventory", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updateStock = async (data, token) => {
  const res = await API.post("/inventory/update", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getInventoryLogs = async (token) => {
  const res = await API.get("/inventory/logs", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// ================= CUSTOMERS =================
export const getCustomers = async (token) => {
  const res = await API.get("/customers", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const createCustomer = async (data, token) => {
  const res = await API.post("/customers", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const deleteCustomer = async (id, token) => {
  const res = await API.delete(`/customers/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// ================= SUPPLIERS =================
export const getSuppliers = async (token) => {
  const res = await API.get("/suppliers", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const createSupplier = async (data, token) => {
  const res = await API.post("/suppliers", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const deleteSupplier = async (id, token) => {
  const res = await API.delete(`/suppliers/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
// ================= PRODUCTS =================
export const getProducts = async (token) => {
  const res = await API.get("/products", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const createProduct = async (data, token) => {
  const res = await API.post("/products", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const deleteProduct = async (id, token) => {
  const res = await API.delete(`/products/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
// ================= SALES ORDERS =================
export const getSalesOrders = async (token) => {
  const res = await API.get("/sales-orders", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const createSalesOrder = async (data, token) => {
  const res = await API.post("/sales-orders", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};