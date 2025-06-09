// src/components/Favorites.jsx
import { useFavorites } from "../contexts/FavoritesContext";
import CoffeeItem from "./CoffeeItem";

export default function Favorites() {
  const { favorites } = useFavorites();
  if (!favorites.length) return <p>Nessun preferito.</p>;
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">I tuoi Preferiti</h2>
      {favorites.map((c) => (
        <CoffeeItem key={c.id} coffee={c} />
      ))}
    </div>
  );
}
