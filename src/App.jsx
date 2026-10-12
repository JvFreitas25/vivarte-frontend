import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminCategory from "./pages/AdminCategory";
import Home from "./pages/Home";
import AdminProduct from "./pages/AdminProduct";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/MyOrders";
import OrderDetails from "./pages/OrderDetails";
import AdminOrders from "./pages/AdminOrders";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/categories" element={<AdminCategory />} />
        <Route path="/home" element={<Home />} />
        <Route
        path="/admin/products"
        element={<AdminProduct />}
        />
        <Route
        path="/products/:id"
        element={<ProductDetails />}
        />
        <Route path="/cart" element={<Cart />} />
        <Route
        path="/checkout"
        element={<Checkout />}
        />
        <Route
        path="/my-orders"
        element={<MyOrders />}
        />
        <Route
        path="/orders/:id"
        element={<OrderDetails />}
        />
        <Route
        path="/admin/orders"
        element={<AdminOrders />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;