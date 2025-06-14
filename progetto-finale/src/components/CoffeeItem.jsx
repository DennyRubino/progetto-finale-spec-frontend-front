// src/components/CoffeeItem.jsx
import { Link } from "react-router-dom";
import { useFavorites } from "../contexts/FavoritesContext";
import { useComparator } from "../contexts/ComparatorContext";

export default function CoffeeItem({ coffee }) {
  const { favorites, addFav, removeFav } = useFavorites();
  const { compareList, toggleCompare } = useComparator();
  const isFav = favorites.some((f) => f.id === coffee.id);
  const inCompare = compareList.some((c) => c.id === coffee.id);

  return (
    <div className="border rounded-lg mb-4 bg-white shadow flex overflow-hidden">
      <img
        src={coffee.imageUrl}
        alt={coffee.title}
        className="w-24 h-24 object-cover"
      />

      {/* Contenuto */}
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <Link
            to={`/coffees/${coffee.id}`}
            className="text-lg font-bold hover:text-yellow-500 transition"
          >
            {coffee.title}
          </Link>
          <p className="text-sm text-gray-600">{coffee.category}</p>
        </div>

        <div className="mt-4 flex space-x-2">
          {/* Preferiti */}
          <button
            onClick={() => (isFav ? removeFav(coffee.id) : addFav(coffee))}
            className="px-3 py-1 border rounded hover:bg-gray-100 transition"
          >
            {isFav ? "❤️" : "🤍"}
          </button>

          {/* Confronto */}
          <button
            onClick={() => toggleCompare(coffee)}
            disabled={!inCompare && compareList.length >= 4}
            className="
              px-3 py-1 
              border rounded 
              transition 
              disabled:opacity-50 disabled:cursor-not-allowed 
              hover:bg-gray-100
            "
          >
            {inCompare ? "✔️" : "+"}
          </button>
        </div>
      </div>
    </div>
  );
}
