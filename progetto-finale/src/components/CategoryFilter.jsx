// src/components/CategoryFilter.jsx
export default function CategoryFilter({ categories, value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border p-2 rounded mb-2"
    >
      <option value="">Tutte le categorie</option>
      {categories.map((cat) => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>
  );
}
