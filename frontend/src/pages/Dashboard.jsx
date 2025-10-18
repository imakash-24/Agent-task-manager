import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Stat from "../components/Stat";
import { useEffect, useState } from "react";
import API from "../api";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const chartData = [
  { name: "Mon", tasks: 4 },
  { name: "Tue", tasks: 7 },
  { name: "Wed", tasks: 3 },
  { name: "Thu", tasks: 5 },
  { name: "Fri", tasks: 9 },
  { name: "Sat", tasks: 2 },
  { name: "Sun", tasks: 6 },
];

const pieData = [
  { name: "Agent A", value: 25 },
  { name: "Agent B", value: 20 },
  { name: "Agent C", value: 15 },
  { name: "Agent D", value: 25 },
  { name: "Agent E", value: 15 },
];

const COLORS = ["#3b82f6", "#6366f1", "#14b8a6", "#f59e0b", "#ef4444"];

export default function Dashboard() {
  const [counts, setCounts] = useState({ agents: 0, tasks: 0 });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const agents = await API.get("/agents");
        const lastTasks = Number(sessionStorage.getItem("lastUploadCount") || 0);
        setCounts({ agents: agents.data.length, tasks: lastTasks });
      } catch {
        setCounts({ agents: 0, tasks: 0 });
      }
    };
    load();
  }, []);

  return (
    <div className="flex min-h-screen bg-[#f5f7fb] text-gray-800">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 shadow-md z-40 transform transition-transform duration-300
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        xl:translate-x-0 xl:static`}
      >
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 xl:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <Topbar
          title="Dashboard"
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
          isSidebarOpen={isSidebarOpen}
        />

        {/* Dashboard content */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Top Stats Section */}
          <div className="grid gap-6 md:grid-cols-3">
            <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100">
              <Stat label="Agents"
               value={counts.agents}
               hint="No of Agents"
                />
            </div>
            <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100">
              <Stat
                label="Last Upload Tasks"
                value={counts.tasks}
                hint="From your most recent import"
              />
            </div>
            <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100">
              <Stat
                label="Total Tasks Distributed"
                value={counts.tasks}
                hint="Across all agents"
              />
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-lg font-semibold mb-4 text-gray-700">
                Weekly Tasks Overview
              </h2>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={chartData}>
                  <XAxis dataKey="name" tickLine={false} />
                  <Tooltip />
                  <Bar dataKey="tasks" fill="#2563eb" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Static Pie Chart (Visual only) */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-lg font-semibold mb-4 text-gray-700">
                Task Distribution (Static)
              </h2>
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={90}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Performance Summary */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">
              Performance Summary
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Task Completion Rate
                </p>
                <div className="w-full bg-gray-100 rounded-full h-3">
                  <div className="bg-blue-600 h-3 rounded-full w-[80%]" />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Agent Response Efficiency
                </p>
                <div className="w-full bg-gray-100 rounded-full h-3">
                  <div className="bg-green-500 h-3 rounded-full w-[70%]" />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Upload Success Rate
                </p>
                <div className="w-full bg-gray-100 rounded-full h-3">
                  <div className="bg-indigo-500 h-3 rounded-full w-[95%]" />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
