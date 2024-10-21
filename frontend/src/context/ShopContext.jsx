import { createContext, useEffect, useMemo, useRef, useState } from "react";
import { ourPolicy } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { get, post } from "../lib/axios";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const currency = "$";
const delivery_fee = 10;
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
  const [access_token, setAccessToken] = useState("");
  const [refresh_token, setRefreshToken] = useState("");
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);

  const isAuthorized = useMemo(() => {
    return !!access_token;
  }, [access_token]);

  const navigate = useNavigate();

  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      setAccessToken(JSON.parse(access_token));
    }
    const refresh_token = localStorage.getItem("refresh_token");
    if (refresh_token) {
      setRefreshToken(JSON.parse(refresh_token));
    }

    fetchProductList();
  }, []);

  useEffect(() => {
    if (isAuthorized) {
      fetchUserData();
    }
  }, [isAuthorized]);

  const fetchUserData = async () => {
    try {
      const res = await get("/me");
      if (res.success) {
        setUser(res.data);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const [totalQty, setTotalQty] = useState(0);

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (user) {
      setCartItems(user.cart);
    }
  }, [user]);

  useEffect(() => {
    const num = cartItems.reduce((acc, curr) => curr.quantity + acc, 0);
    setTotalQty(num);
  }, [cartItems]);

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

  const bestSellerProdcuts = products
    .filter((item) => item.bestseller)
    .slice(-5);

  const logout = () => {
    setAccessToken("");
    setRefreshToken("");
    setUser(null);
    setCartItems([]);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    toast.success("Logged out!");
    navigate("/");
  };

  const fetchProductList = async () => {
    try {
      const res = await get("/product");
      setProducts(res.data);
      setProductData(res.data);
    } catch (error) {
      toast.error(error);
    }
  };
  const size = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageProducts, setCurrentPageProducts] = useState([]);
  const listRef = useRef(null);

  const [productData, setProductData] = useState([]);

  const [filter, setFilter] = useState({
    category: [],
    subCategory: [],
  });
  const [sortType, setSortType] = useState("");

  const [search, setSearch] = useState("");

  const timeId = useRef(null);

  useEffect(() => {
    let data = products.slice();

    // 检查 category 是否变化
    if (filter.category.length !== 0 || filter.subCategory.length !== 0) {
      if (filter.category.length) {
        data = data.filter((item) =>
          filter.category.includes(item.category.toLowerCase())
        );
      }

      if (filter.subCategory.length) {
        data = data.filter((item) =>
          filter.subCategory.includes(item.subCategory.toLowerCase())
        );
      }
    }

    switch (sortType) {
      case "low-high":
        setProductData(data.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setProductData(data.sort((a, b) => b.price - a.price));
        break;

      default:
        setProductData(
          data.sort((a, b) => Date.parse(a.updatedAt) - Date.parse(b.updatedAt))
        );
        break;
    }

    if (search) {
      if (timeId.current) clearTimeout(timeId.current);
      timeId.current = setTimeout(() => {
        data = data.filter((item) =>
          item.name.toLowerCase().includes(search.toLowerCase())
        );
        setProductData(data);
      }, 300);
    }

    setProductData(data);
  }, [filter, sortType, search]);

  useEffect(() => {
    fetchProductData(currentPage);
  }, [currentPage, productData]);

  const fetchProductData = (index) => {
    const data = productData?.slice((index - 1) * size, index * size);
    setCurrentPageProducts(data);
    if (listRef.current) {
      listRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [payAddress, setPayAddress] = useState("");

  const value = {
    user,
    setUser,
    isAuthorized,
    refresh_token,
    access_token,
    setAccessToken,
    setRefreshToken,
    logout,
    navigate,
    currency,
    latesProducts,
    bestSellerProdcuts,
    title1,
    title2,
    ourPolicy,
    search,
    setSearch,
    fetchItemData,
    getRelatedItems,
    products,
    productData,
    setProductData,
    setSortType,
    filter,
    setFilter,
    currentPageProducts,
    setCurrentPage,
    currentPage,
    listRef,
    cartItems,
    delivery_fee,
    totalQty,
    setTotalQty,
    setPayAddress,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
