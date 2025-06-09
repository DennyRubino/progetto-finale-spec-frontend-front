// src/components/CoffeeDetail.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchCoffeeById } from "../api";
import { useFavorites } from "../contexts/FavoritesContext";
import { useComparator } from "../contexts/ComparatorContext";

export default function CoffeeDetail() {
  const { id } = useParams();
  const [coffee, setCoffee] = useState(null);
  const { favorites, addFav, removeFav } = useFavorites();
  const { compareList, toggleCompare } = useComparator();

  useEffect(() => {
    fetchCoffeeById(id).then(setCoffee);
  }, [id]);

  if (!coffee) return <p>Caricamento...</p>;

  const isFav = favorites.some((f) => f.id === coffee.id);
  const inCompare = compareList.some((c) => c.id === coffee.id);

  return (
    <div className="p-4 border rounded">
      <h2 className="text-2xl font-bold">{coffee.title}</h2>
      <p>
        <strong>Categoria:</strong> {coffee.category}
      </p>
      <p>
        <strong>Origine:</strong> {coffee.origin}
      </p>
      <p>
        <strong>Livello di tostatura:</strong> {coffee.roastLevel}
      </p>
      <p>
        <strong>Prezzo:</strong> €{coffee.price.toFixed(2)}
      </p>
      <p className="mt-2">{coffee.description}</p>
      <div className="mt-4 space-x-2">
        <button
          onClick={() => (isFav ? removeFav(coffee.id) : addFav(coffee))}
          className="px-4 py-2 border rounded"
        >
          {isFav ? "Rimuovi dai Preferiti" : "Aggiungi ai Preferiti"}
        </button>
        <button
          onClick={() => toggleCompare(coffee)}
          className="px-4 py-2 border rounded"
          disabled={!inCompare && compareList.length >= 2}
        >
          {inCompare ? "Rimuovi dal Confronto" : "Aggiungi al Confronto"}
        </button>
      </div>
    </div>
  );
}
