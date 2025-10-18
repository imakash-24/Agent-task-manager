export default function AgentRow({ agent, onDelete }) {
  return (
    <div className="flex items-center justify-between border-b py-3">
      <div>
        <div className="font-medium">{agent.name}</div>
        <div className="text-xs text-gray-500">{agent.email} • {agent.mobile}</div>
      </div>
      <button onClick={() => onDelete(agent._id)} className="text-red-600 hover:underline text-sm">
        Delete
      </button>
    </div>
  );
}
