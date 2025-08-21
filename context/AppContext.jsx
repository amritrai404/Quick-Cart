'use client'

import { useAuth, useUser } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used inside AppContextProvider');
  return context;
};

export const AppContextProvider = ({ children }) => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY || "₹";
  const router = useRouter();

  const { user } = useUser();
  const { getToken } = useAuth();

  const [products, setProducts] = useState([]);
  const [userData, setUserData] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch all products from DummyJSON
  const fetchProductData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("https://dummyjson.com/products");
      if (data.products) {
        setProducts(data.products);
      } else {
        toast.error("Failed to fetch products");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Simplified user data handling
  const fetchUserData = async () => {
    if (!user) return;
    try {
      if (user.publicMetadata?.role === "seller") setIsSeller(true);
      setUserData({
        id: user.id,
        name: user.fullName,
        email: user.primaryEmailAddress?.emailAddress,
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Cart functions (client-side only now)
  const addToCart = (itemId) => {
    const cartData = { ...cartItems };
    cartData[itemId] = (cartData[itemId] || 0) + 1;
    setCartItems(cartData);
    toast.success("Item added to cart");
  };

  const updateCartQuantity = (itemId, quantity) => {
    const cartData = { ...cartItems };
    if (quantity === 0) delete cartData[itemId];
    else cartData[itemId] = quantity;
    setCartItems(cartData);
    toast.success("Cart updated");
  };

  const getCartCount = () => Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);

  const getCartAmount = () => {
    return Object.entries(cartItems).reduce((total, [id, qty]) => {
      const product = products.find(p => p.id === parseInt(id));
      return product ? total + (product.price * qty) : total;
    }, 0);
  };

  useEffect(() => { fetchProductData(); }, []);
  useEffect(() => { fetchUserData(); }, [user]);

  const value = {
    user,
    getToken,
    currency,
    router,
    isSeller,
    setIsSeller,
    userData,
    fetchUserData,
    products,
    loading,
    fetchProductData,
    cartItems,
    setCartItems,
    addToCart,
    updateCartQuantity,
    getCartCount,
    getCartAmount,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};