// src/components/SortControl.jsx
export default function SortControl({ sortBy, order, onSortChange }) {
  return (
    <div className="mb-4 flex space-x-2">
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value, order)}
        className="border p-2 rounded"
      >
        <option value="">Nessun ordinamento</option>
        <option value="title">Titolo</option>
        <option value="category">Categoria</option>
      </select>
      <select
        value={order}
        onChange={(e) => onSortChange(sortBy, e.target.value)}
        className="border p-2 rounded"
      >
        <option value="asc">A-Z</option>
        <option value="desc">Z-A</option>
      </select>
    </div>
  );
}
