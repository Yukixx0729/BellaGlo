import { ClerkProvider } from "@clerk/clerk-react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

function App() {
  const publishableKey = import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY;
  return (
    <>
      <div className="header-color text-center py-2">
        Free delivery national wide over $99{" "}
      </div>

      <ClerkProvider publishableKey={publishableKey}>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </ClerkProvider>
      <Footer />
    </>
  );
}

export default App;
