// src/api.js
const API_BASE = "http://localhost:3001";

export async function fetchCoffees({
  search = "",
  category = "",
  sortBy = "",
  order = "asc",
} = {}) {
  // 1) Prendo la lista parziale
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (category) params.append("category", category);

  const res = await fetch(`${API_BASE}/coffees?${params.toString()}`);
  if (!res.ok) throw new Error(`Error fetching coffees: ${res.status}`);
  const wrappers = await res.json();
  // wrappers: [ { coffee: {id,title,category}, success:true }, … ]

  // 2) Estraggo gli id
  const partials = wrappers.map((w) => ("coffee" in w ? w.coffee : w));

  // 3) Per ogni id faccio GET /coffees/:id per avere l’oggetto completo
  const fullList = await Promise.all(
    partials.map((c) => fetchCoffeeById(c.id).catch((_) => null))
  );

  // 4) Filtra eventuali errori e ordina
  let data = fullList.filter(Boolean);

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
  if (!id) throw new Error("Invalid ID");

  const res = await fetch(`${API_BASE}/coffees/${id}`);
  if (!res.ok) throw new Error("Not found");

  const json = await res.json();
  // json: { coffee: {…}, success: true }
  return "coffee" in json ? json.coffee : json;
}
