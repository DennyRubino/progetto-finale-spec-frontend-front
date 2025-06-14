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
      <main className="pt-16 bg-gray-100 min-h-screen">
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
