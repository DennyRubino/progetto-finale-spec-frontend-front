// src/api.js
const API_BASE = "http://localhost:3001";

export async function fetchCoffees({
  search = "",
  category = "",
  sortBy = "",
  order = "asc",
} = {}) {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (category) params.append("category", category);
  let url = `${API_BASE}/coffees?${params.toString()}`;
  const res = await fetch(url);
  let data = await res.json();
  if (sortBy) {
    data = data.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return order === "asc" ? -1 : 1;
      if (a[sortBy] > b[sortBy]) return order === "asc" ? 1 : -1;
      return 0;
    });
  }
  return data;
}

export async function fetchCoffeeById(id) {
  const res = await fetch(`${API_BASE}/coffees/${id}`);
  if (!res.ok) throw new Error("Not found");
  return res.json();
}
