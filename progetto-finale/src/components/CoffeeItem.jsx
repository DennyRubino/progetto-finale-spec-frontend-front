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
    <div className="border p-4 rounded mb-2 flex justify-between items-center">
      <div>
        <Link to={`/coffees/${coffee.id}`} className="font-bold">
          {coffee.title}
        </Link>
        <p className="text-sm text-gray-600">{coffee.category}</p>
      </div>
      <div className="space-x-2">
        <button
          onClick={() => (isFav ? removeFav(coffee.id) : addFav(coffee))}
          className="px-2 py-1 border rounded"
        >
          {isFav ? "❤️" : "🤍"}
        </button>
        <button
          onClick={() => toggleCompare(coffee)}
          className="px-2 py-1 border rounded"
          disabled={!inCompare && compareList.length >= 2}
        >
          {inCompare ? "✔️" : "+"}
        </button>
      </div>
    </div>
  );
}
