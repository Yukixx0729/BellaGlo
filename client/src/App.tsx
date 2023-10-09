import { ClerkProvider } from "@clerk/clerk-react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Nav from "./components/Nav";

function App() {
  const publishableKey = import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY;
  return (
    <>
      <div className="header-color text-center py-2">
        Free delivery national wide over $99{" "}
      </div>
      <Nav />
      <ClerkProvider publishableKey={publishableKey}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </ClerkProvider>
    </>
  );
}

export default App;
