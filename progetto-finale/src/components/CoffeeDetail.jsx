// src/components/CoffeeDetail.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchCoffeeById } from "../api";
import { useFavorites } from "../contexts/FavoritesContext";
import { useComparator } from "../contexts/ComparatorContext";

export default function CoffeeDetail() {
  const { id } = useParams();
  const [coffee, setCoffee] = useState("");
  const [error, setError] = useState("");
  const { favorites, addFav, removeFav } = useFavorites();
  const { compareList, toggleCompare } = useComparator();

  useEffect(() => {
    fetchCoffeeById(id)
      .then(setCoffee)
      .catch(() => setError("Caffè non trovato"));
  }, [id]);

  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;
  if (!coffee) return <p className="text-center mt-10">Caricamento…</p>;

  const isFav = favorites.some((f) => f.id === coffee.id);
  const inCompare = compareList.some((c) => c.id === coffee.id);

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <img
          src={coffee.imageUrl}
          alt={coffee.title}
          className="w-full max-h-96 object-contain mx-auto rounded-md mb-4"
        />

        <h2 className="text-3xl font-bold">{coffee.title}</h2>

        <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <p>
              <strong>Categoria:</strong> {coffee.category}
            </p>
            <p>
              <strong>Origine:</strong> {coffee.origin}
            </p>
            <p>
              <strong>Tostatura:</strong> {coffee.roastLevel}
            </p>
          </div>
          <div>
            <p>
              <strong>Prezzo:</strong> €{coffee.price.toFixed(2)}
            </p>
            <p className="mt-2">{coffee.description}</p>
          </div>
        </div>

        <div className="flex space-x-4 mt-4">
          <button
            onClick={() => (isFav ? removeFav(coffee.id) : addFav(coffee))}
            className="btn btn-primary"
          >
            {isFav ? "Rimuovi dai Preferiti" : "Aggiungi ai Preferiti"}
          </button>
          <button
            onClick={() => toggleCompare(coffee)}
            disabled={!inCompare && compareList.length >= 4}
            className="btn btn-outline disabled:opacity-50"
          >
            {inCompare ? "Rimuovi dal Confronto" : "Aggiungi al Confronto"}
          </button>
        </div>
      </div>
    </div>
  );
}
