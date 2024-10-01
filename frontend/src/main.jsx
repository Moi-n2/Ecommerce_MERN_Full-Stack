import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./styles/rc-select.less";
import { BrowserRouter } from "react-router-dom";
import ShopContextProvider from "./context/ShopContext.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <BrowserRouter>
    <ShopContextProvider>
      <App />
    </ShopContextProvider>
  </BrowserRouter>
  // </StrictMode>
);
