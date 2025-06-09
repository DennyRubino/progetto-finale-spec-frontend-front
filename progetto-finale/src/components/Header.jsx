// src/components/Header.jsx
import { NavLink } from "react-router-dom";
import { useFavorites } from "../contexts/FavoritesContext";
import { useComparator } from "../contexts/ComparatorContext";

export default function Header() {
  const { favorites } = useFavorites();
  const { compareList } = useComparator();

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Coffee Comparator</h1>
      <nav className="space-x-4">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "underline" : "")}
        >
          Home
        </NavLink>
        <NavLink
          to="/favorites"
          className={({ isActive }) => (isActive ? "underline" : "")}
        >
          Favorites ({favorites.length})
        </NavLink>
        <NavLink
          to="/compare"
          className={({ isActive }) => (isActive ? "underline" : "")}
        >
          Compare ({compareList.length}/2)
        </NavLink>
      </nav>
    </header>
  );
}
