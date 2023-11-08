import { ClerkProvider } from "@clerk/clerk-react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Aboutus from "./components/Aboutus";
import Contactus from "./components/Contactus";
import Team from "./components/Team";
import Career from "./components/Career";
import Signout from "./components/SignOut";
import { CartProvider } from "./middleware/CartContext";
import Products from "./components/Product";
import Series from "./components/Series";
import CartDisplay from "./components/CartDisplay";
import CheckOut from "./components/Checkout";

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
              <Route path="/checkout/:id" element={<CheckOut />} />
            </Routes>
          </div>
        </CartProvider>
      </ClerkProvider>
      <Footer />
    </div>
  );
}

export default App;
