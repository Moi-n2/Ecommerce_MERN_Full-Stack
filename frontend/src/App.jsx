import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

import Home from "@/pages/Home";
import About from "@/pages/About";
import Collection from "@/pages/Collection";
import Login from "@/pages/Login";
import Product from "@/pages/Product";
import Orders from "@/pages/Orders";
import Cart from "@/pages/Cart";

function App() {
  return (
    <>
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] pb-6">
        <ToastContainer />
        <NavBar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/login" element={<Login />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>

        <Footer />
      </div>
    </>
  );
}

export default App;
