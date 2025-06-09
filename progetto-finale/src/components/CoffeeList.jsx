// src/components/CoffeeList.jsx
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
    fetchCoffees({ search, category, sortBy, order }).then((data) => {
      setCoffees(data);
      if (!cats.length) setCats([...new Set(data.map((c) => c.category))]);
    });
  }, [search, category, sortBy, order]);

  return (
    <div>
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
      {coffees.map((c) => (
        <CoffeeItem key={c.id} coffee={c} />
      ))}
    </div>
  );
}
