export default function StatCard({ title, value, color }) {
  const colors = {
    red: "text-red-600",
    yellow: "text-yellow-600",
    green: "text-green-600",
    indigo: "text-indigo-700",
    purple: "text-purple-600"
  };
  return (
    <div className="bg-white rounded-xl shadow p-4 text-center">
      <h3 className="text-sm text-gray-500">{title}</h3>
      <p className={`text-2xl font-bold ${colors[color]}`}>{value}</p>
    </div>
  );
}