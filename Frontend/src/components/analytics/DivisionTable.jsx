export default function DivisionTable({ divisions }) {
  return (
    <table className="w-full text-sm text-left text-gray-700">
      <thead>
        <tr className="bg-indigo-100 text-indigo-700">
          <th className="px-4 py-2">Division</th>
          <th className="px-4 py-2">Tasks</th>
        </tr>
      </thead>
      <tbody>
        {divisions.map((d, i) => (
          <tr key={i}>
            <td className="px-4 py-2">{d.name}</td>
            <td className="px-4 py-2">{d.count}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}