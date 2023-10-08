import React from "react";
import { ClerkProvider } from "@clerk/clerk-react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

// if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
//   throw new Error("Missing Publishable Key");
// }

// const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

function App() {
  return (
    <>
      <div>BellaGlo</div>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
