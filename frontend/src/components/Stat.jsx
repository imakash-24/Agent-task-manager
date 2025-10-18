export default function Stat({ label, value, hint }) {
  return (
    <div className="card p-4">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="text-2xl font-bold">{value}</div>
      {hint && <div className="text-xs text-gray-400 mt-1">{hint}</div>}
    </div>
  );
}
