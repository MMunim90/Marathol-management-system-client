import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import router from "./router/Router.jsx";
import { RouterProvider } from "react-router";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./Provider/AuthProvider.jsx";
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <RouterProvider router={router} />
        <ToastContainer style={{ top: "80px" }} />
      </AuthProvider>
    </HelmetProvider>
  </StrictMode>
);
