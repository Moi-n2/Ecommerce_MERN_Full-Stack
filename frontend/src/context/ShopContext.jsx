import { createContext, useEffect, useRef, useState } from "react";
import { products, ourPolicy } from "../assets/assets";

export const ShopContext = createContext();

const size = 20;
const currency = "$";
const title1 = {
  text1: "latest",
  text2: "collections",
  subtitle:
    " Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, error sunt, ratione",
};
const title2 = {
  text1: "best",
  text2: "sellers",
  subtitle: " Lorem ipsum dolor sit amet consectetur adipisicing elit.",
};

const ShopContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([
    {
      product: products[0],
      quantity: 1,
      size: "M",
    },
    {
      product: products[1],
      quantity: 1,
      size: "L",
    },
  ]);
  const listRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const [productData, setProductData] = useState([]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProductData(currentPage, size);
  }, [currentPage]);

  const fetchProductData = (index, size) => {
    const data = products.slice((index - 1) * size, index * size);

    setProductData(data);
    if (listRef.current) {
      listRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const fetchItemData = (id) => {
    const data = products.find((item) => item._id === id);
    return data;
  };

  const getRelatedItems = (category, subCategory) => {
    let items = [];
    items = products.filter(
      (item) => item.category === category && subCategory === item.subCategory
    );
    return items.slice(0, 5);
  };

  const latesProducts = products.slice(0, 10);

  const bestSellerProdcuts = products.slice(-5);

  const value = {
    currency,
    latesProducts,
    bestSellerProdcuts,
    title1,
    title2,
    ourPolicy,
    search,
    setSearch,
    productData,
    onPageChange,
    listRef,
    fetchItemData,
    getRelatedItems,
    cartItems,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
