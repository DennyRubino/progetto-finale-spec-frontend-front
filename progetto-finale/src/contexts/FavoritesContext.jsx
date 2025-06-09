// src/contexts/FavoritesContext.jsx
import { createContext, useState, useContext } from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("favs")) || [];
    } catch {
      return [];
    }
  });

  const addFav = (item) => {
    setFavorites((f) => {
      const next = [...f.filter((i) => i.id !== item.id), item];
      localStorage.setItem("favs", JSON.stringify(next));
      return next;
    });
  };

  const removeFav = (id) => {
    setFavorites((f) => {
      const next = f.filter((i) => i.id !== id);
      localStorage.setItem("favs", JSON.stringify(next));
      return next;
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFav, removeFav }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => useContext(FavoritesContext);
