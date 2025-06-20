// src/components/Comparator.jsx
import React, { useState, useEffect } from "react";
import { useComparator } from "../contexts/ComparatorContext";
import { fetchCoffeeById } from "../api";

const LABELS_IT = {
  title: "Titolo",
  category: "Categoria",
  origin: "Origine",
  roastLevel: "Tostatura",
  price: "Prezzo",
  description: "Descrizione",
};

export default function Comparator() {
  const { compareList: compareIds, clearCompare } = useComparator();
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (compareIds.length < 2) {
      setItems([]);
      return;
    }
    Promise.all(compareIds.map((c) => fetchCoffeeById(c.id)))
      .then((full) => setItems(full))
      .catch((err) => console.error(err));
  }, [compareIds]);

  if (compareIds.length < 2) {
    return (
      <div className="max-w-6xl mx-auto px-6 mt-20 text-center text-gray-600">
        Seleziona 2 caffè per confrontarli.
      </div>
    );
  }

  const list = items.slice(0, 4);
  const colsClass =
    {
      2: "grid-cols-3",
      3: "grid-cols-4",
      4: "grid-cols-5",
    }[list.length] || "grid-cols-3";

  const keys = Object.keys(list[0] ?? {}).filter(
    (k) => !["id", "createdAt", "updatedAt", "imageUrl"].includes(k)
  );

  return (
    <div className="max-w-6xl mx-auto px-6 mt-20">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Confronto Caffè</h2>
        <button onClick={clearCompare} className="btn-outline">
          Svuota Confronto
        </button>
      </div>

      <div
        className={`grid ${colsClass} gap-4 bg-white shadow rounded-lg overflow-hidden`}
      >
        <div className="bg-gray-100 p-3"></div>

        {list.map((c) => (
          <div
            key={`hdr-${c.id}`}
            className="bg-gray-100 p-3 flex flex-col items-center"
          >
            <img
              src={c.imageUrl}
              alt={c.title}
              className="w-28 h-28 object-cover rounded-lg mb-2"
            />
          </div>
        ))}

        {keys.map((key) => (
          <React.Fragment key={key}>
            <div className="p-3 font-medium bg-gray-50">{LABELS_IT[key]}</div>
            {list.map((c) => (
              <div key={`${c.id}-${key}`} className="p-3 text-center">
                {key === "price"
                  ? `€${(c.price ?? 0).toFixed(2)}`
                  : c[key] ?? "—"}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
