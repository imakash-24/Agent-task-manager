
export default function StatCard({ icon: Icon, label, value, hint, color }) {
  return (
    <div className="p-6 rounded-2xl shadow-sm border bg-white flex items-center gap-4 hover:shadow-md transition">
      <div className={("p-3 rounded-xl text-white", color)}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
        {hint && <p className="text-xs text-gray-400">{hint}</p>}
      </div>
    </div>
  );
}
