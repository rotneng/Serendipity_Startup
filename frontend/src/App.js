import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Containers/Signup";
import Signin from "./Containers/Signin";
import Home from "./Containers/Home";
import Navbar from "./Containers/Navbar";
import AddProduct from "./Containers/AddProduct";
import ProductDetails from "./Containers/ProductDetails";
import Marketplace from "./Containers/Marketplace";
import Profile from "./Containers/Profile";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/" element={<Home />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Marketplace />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
