import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { RouterApp } from "./router/RouterApp";
import "./styles/global.css";
import "./styles/layout.css";
import "./styles/form.css";
import "./styles/messages.css";


createRoot(document.getElementById("root")).render(
  
    <BrowserRouter>
      <RouterApp />
    </BrowserRouter>
  
);
