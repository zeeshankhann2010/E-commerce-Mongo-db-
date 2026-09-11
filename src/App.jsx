import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar/navbar.jsx";
import Home from "./components/home/home.jsx";
import Shop from "./components/shop/shop.jsx";
import Cart from "./components/cart/cart.jsx";
import NewArrival from "./components/newarrival/newarrval.jsx";
import Footer from "./components/footer/footer.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/newarrival" element={<NewArrival />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;