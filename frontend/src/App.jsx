import { ToastContainer } from "react-toastify";
import { Route, Routes, Navigate } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

import Home from "@/pages/Home";
import About from "@/pages/About";
import Collection from "@/pages/Collection";
import Login from "@/pages/Login";
import Product from "@/pages/Product";
import Orders from "@/pages/Orders";
import Cart from "@/pages/Cart";
import VerifyCode from "./pages/VerifyCode";
import { useContext } from "react";
import { ShopContext } from "./context/ShopContext";
import VerifyPay from "./pages/VerifyPay";

function App() {
  const { isAuthorized } = useContext(ShopContext);
  return (
    <>
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] pb-6">
        <ToastContainer />
        <NavBar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/collection" element={<Collection />} />
          <Route
            path="/login"
            element={isAuthorized ? <Navigate to="/" /> : <Login />}
          />
          <Route path="/product/:productId" element={<Product />} />
          <Route
            path="/cart"
            element={isAuthorized ? <Cart /> : <Navigate to="/login" />}
          />
          <Route
            path="/orders"
            element={isAuthorized ? <Orders /> : <Navigate to="/login" />}
          />
          <Route path="/verify-code" element={<VerifyCode />} />
          <Route path="/verify" element={<VerifyPay />} />
        </Routes>

        <Footer />
      </div>
    </>
  );
}

export default App;
