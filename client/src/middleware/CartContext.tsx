import { useUser } from "@clerk/clerk-react";
import { createContext, useContext, useState } from "react";

const CartContext = createContext({});

export const CartProvider = ({ children }: any) => {
  const user = useUser();

  const [cartCount, setCartCount] = useState(0);

  const addToCart = () => {
    setCartCount((prevCount) => prevCount + 1);
  };

  const addToCartWithUser = async () => {
    const res = await fetch("");
  };

  return (
    <CartContext.Provider value={{ cartCount, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
