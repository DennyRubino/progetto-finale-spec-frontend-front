// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import CoffeeList from "./components/CoffeeList";
import CoffeeDetail from "./components/CoffeeDetail";
import Favorites from "./components/Favorites";
import Comparator from "./components/Comparator";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="p-4">
        <Routes>
          <Route path="/" element={<CoffeeList />} />
          <Route path="/coffees/:id" element={<CoffeeDetail />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/compare" element={<Comparator />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
