// src/index.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import { ComparatorProvider } from "./contexts/ComparatorContext";

// 1. Prendi il container dal DOM
const container = document.getElementById("root");

// 2. Crea il root React
const root = ReactDOM.createRoot(container);

// 3. Usa root.render invece di ReactDOM.render
root.render(
  <React.StrictMode>
    <FavoritesProvider>
      <ComparatorProvider>
        <App />
      </ComparatorProvider>
    </FavoritesProvider>
  </React.StrictMode>
);
