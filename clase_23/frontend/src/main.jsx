import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { RouterApp } from "./router/RouterApp";

createRoot(document.getElementById("root")).render(
  
    <BrowserRouter>
      <RouterApp />
    </BrowserRouter>
  
);
