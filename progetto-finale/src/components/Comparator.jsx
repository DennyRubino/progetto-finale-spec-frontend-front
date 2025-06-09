// src/components/Comparator.jsx
import { useComparator } from "../contexts/ComparatorContext";

export default function Comparator() {
  const { compareList, clearCompare } = useComparator();
  if (compareList.length < 2) {
    return <p>Seleziona 2 caffè per confrontarli.</p>;
  }

  const [a, b] = compareList;
  const keys = Object.keys(a).filter(
    (k) => k !== "id" && k !== "createdAt" && k !== "updatedAt"
  );

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Confronto</h2>
      <button onClick={clearCompare} className="mb-4 px-2 py-1 border rounded">
        Svuota Confronto
      </button>
      <div className="grid grid-cols-3 gap-4">
        <div></div>
        <div className="font-bold text-center">{a.title}</div>
        <div className="font-bold text-center">{b.title}</div>
        {keys.map((key) => (
          <React.Fragment key={key}>
            <div className="font-semibold">{key}</div>
            <div className="text-center">{String(a[key])}</div>
            <div className="text-center">{String(b[key])}</div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
