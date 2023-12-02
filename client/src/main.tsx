import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import "./scss/styles.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <BrowserRouter basename="/subdirectory">
    {" "}
    <App />
  </BrowserRouter>
  // </React.StrictMode>
);
