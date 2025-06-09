// src/contexts/ComparatorContext.jsx
import { createContext, useState, useContext } from "react";

const ComparatorContext = createContext();

export function ComparatorProvider({ children }) {
  const [compareList, setCompareList] = useState([]);

  const toggleCompare = (item) => {
    setCompareList((c) => {
      const exists = c.find((i) => i.id === item.id);
      if (exists) return c.filter((i) => i.id !== item.id);
      if (c.length >= 2) return c; // massimo 2
      return [...c, item];
    });
  };

  const clearCompare = () => setCompareList([]);

  return (
    <ComparatorContext.Provider
      value={{ compareList, toggleCompare, clearCompare }}
    >
      {children}
    </ComparatorContext.Provider>
  );
}

export const useComparator = () => useContext(ComparatorContext);
