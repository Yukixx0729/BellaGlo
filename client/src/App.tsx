import { ClerkProvider } from "@clerk/clerk-react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Nav from "./components/Home/Nav";
import Footer from "./components/Footer/Footer";
import Signin from "./components/Auth/Signin";
import Signup from "./components/Auth/Signup";
import Aboutus from "./components/Footer/Aboutus";
import Contactus from "./components/Footer/Contactus";
import Team from "./components/Footer/Team";
import Career from "./components/Footer/Career";
import Signout from "./components/Auth/SignOut";
import { CartProvider } from "./middleware/CartContext";
import Products from "./components/Products/Product";
import Series from "./components/Products/Series";
import CartDisplay from "./components/CartAndCheckout/CartDisplay";
import CheckOut from "./components/CartAndCheckout/Checkout";

import OrderPending from "./components/CartAndCheckout/OrderPending";
import EmptyCart from "./components/CartAndCheckout/EmptyCart";
import MyOrders from "./components/Account/MyOrders";
import ProductDetail from "./components/Products/ProductDetails";

function App() {
  const publishableKey = import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY;

  return (
    <div className="d-flex flex-column min-vh-100">
      <ClerkProvider publishableKey={publishableKey}>
        <CartProvider>
          <div className="header-color text-center py-2">
            Free delivery national wide over $99{" "}
          </div>

          <Nav />
          <div className="flex-grow-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sign-in" element={<Signin />} />
              <Route path="/sign-up" element={<Signup />} />
              <Route path="/about" element={<Aboutus />} />
              <Route path="/contact" element={<Contactus />} />
              <Route path="/team" element={<Team />} />
              <Route path="/career" element={<Career />} />
              <Route path="/sign-out" element={<Signout />} />
              <Route path="/type/:type" element={<Products />} />
              <Route path="/series/:series" element={<Series />} />
              <Route path="/cart/:id" element={<CartDisplay />} />
              <Route path="/cart" element={<EmptyCart />} />
              <Route path="/checkout/:cartId" element={<CheckOut />} />
              <Route path="/pending/:orderId" element={<OrderPending />} />
              <Route path="/orders" element={<MyOrders />} />
              <Route path="/product/:productId" element={<ProductDetail />} />
            </Routes>
          </div>
        </CartProvider>
      </ClerkProvider>
      <Footer />
    </div>
  );
}

export default App;
