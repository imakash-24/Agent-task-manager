// shows tasks grouped by agent after an upload response
export default function GroupedTasks({ agents, tasks }) {
  // group by agentId
  const byAgent = tasks.reduce((acc, t) => {
    const id = t.agentId?._id || t.agentId; // server may populate or just send _id
    if (!acc[id]) acc[id] = [];
    acc[id].push(t);
    return acc;
  }, {});
  const getAgentName = (id) => {
    const a = agents.find((x) => x._id === id);
    return a ? a.name : "Unknown Agent";
    };

  const agentIds = Object.keys(byAgent);

  if (agentIds.length === 0) {
    return <div className="text-sm text-gray-500">No tasks to display yet.</div>;
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {agentIds.map((id) => (
        <div key={id} className="card p-4">
          <div className="font-semibold mb-2">{getAgentName(id)}</div>
          <div className="text-xs text-gray-500 mb-3">{byAgent[id].length} tasks</div>
          <div className="space-y-2 max-h-64 overflow-auto pr-1">
            {byAgent[id].map((t, idx) => (
              <div key={idx} className="border rounded-lg p-3">
                <div className="font-medium text-sm">{t.firstName || t.name}</div>
                <div className="text-xs text-gray-500">{t.phone}</div>
                {t.notes && <div className="text-xs mt-1">{t.notes}</div>}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
