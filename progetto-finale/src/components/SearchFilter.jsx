// src/components/SearchFilter.jsx
export default function SearchFilter({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Cerca per titolo..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border p-2 rounded w-full mb-2"
    />
  );
}
