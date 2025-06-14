import { useEffect, useState } from "react";
import { fetchCoffees } from "../api";
import CoffeeItem from "./CoffeeItem";
import SearchFilter from "./SearchFilter";
import CategoryFilter from "./CategoryFilter";
import SortControl from "./SortControl";

export default function CoffeeList() {
  const [coffees, setCoffees] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("asc");
  const [cats, setCats] = useState([]);

  useEffect(() => {
    fetchCoffees({ search, category, sortBy, order })
      .then((data) => {
        console.log("→ fetched coffees:", data);
        setCoffees(data);
        if (data.length && !cats.length) {
          setCats([...new Set(data.map((c) => c.category))]);
        }
      })
      .catch((err) => {
        console.error(err);
        setCoffees([]);
      });
  }, [search, category, sortBy, order]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <SearchFilter value={search} onChange={setSearch} />
      <CategoryFilter
        categories={cats}
        value={category}
        onChange={setCategory}
      />
      <SortControl
        sortBy={sortBy}
        order={order}
        onSortChange={(s, o) => {
          setSortBy(s);
          setOrder(o);
        }}
      />

      {coffees.length === 0 ? (
        <p className="text-center text-gray-600 mt-8">
          Nessun caffè da mostrare.
        </p>
      ) : (
        <div className="space-y-4">
          {coffees
            .filter((c) => c.id != null)
            .map((c) => (
              <CoffeeItem key={c.id} coffee={c} />
            ))}
        </div>
      )}
    </div>
  );
}
