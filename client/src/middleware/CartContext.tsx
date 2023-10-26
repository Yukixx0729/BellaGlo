import { useUser } from "@clerk/clerk-react";
import { createContext, useContext, useEffect, useState } from "react";
import { findUser } from "./Auth";

type CartContextType = {
  cartCount: number;
  cartId: string;
  addToCartWithUser: (productId: string) => Promise<void>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC = ({ children }: any) => {
  const user = useUser();
  const [cartCount, setCartCount] = useState(0);
  const [cartId, setCartId] = useState("");

  useEffect(() => {
    const fetchCartCount = async () => {
      if (user.isSignedIn) {
        const userData = await findUser(`${user.user.id}`);
        if (userData.cart[0]) {
          setCartId(userData.cart[0].id);
          setCartCount(userData.cart[0].product.length);
        }
      }
    };

    fetchCartCount();
  }, [user]);

  const addToCartWithUser = async (productId: string) => {
    if (user.isSignedIn) {
      const userData = await findUser(`${user.user.id}`);
      if (userData.cart[0]) {
        const res = await fetch(
          `http://localhost:3000/api/cart/${userData.cart[0].id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ productId: productId }),
          }
        );
        const data = await res.json();
        setCartCount(data.product.length);
      } else {
        const res = await fetch(`http://localhost:3000/api/cart`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: userData.id, productId: [productId] }),
        });
        const data = await res.json();
        setCartCount(data.product.length);
      }
    }
  };

  return (
    <CartContext.Provider value={{ cartCount, cartId, addToCartWithUser }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
