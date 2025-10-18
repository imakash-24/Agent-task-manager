import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { useEffect, useState } from "react";
import API from "../api";
import AgentRow from "../components/AgentRow";

export default function Agents() {
  const [agents, setAgents] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", mobile: "", password: "" });
  const [err, setErr] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const load = async () => {
    const { data } = await API.get("/agents");
    setAgents(data);
  };

  useEffect(() => { load(); }, []);

  const createAgent = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await API.post("/agents", form);
      setForm({ name: "", email: "", mobile: "", password: "" });
      load();
    } catch (e) {
      setErr(e?.response?.data?.message || "Failed to create agent");
    }
  };

  const del = async (id) => {
    await API.delete(`/agents/${id}`);
    load();
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r shadow-lg z-40 transform transition-transform duration-300
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        xl:translate-x-0 xl:static`}
      >
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Overlay for mobile/tablet */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 xl:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <Topbar
          title="Agents"
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
          isSidebarOpen={isSidebarOpen}
        />

        <main className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6 grid md:grid-cols-2 gap-6">
            <form onSubmit={createAgent} className="card p-5">
              <div className="text-lg font-semibold mb-3">Add Agent</div>
              {err && <div className="text-red-600 text-sm mb-2">{err}</div>}
              <div className="grid grid-cols-1 gap-3">
                <input className="input" placeholder="Name" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})}/>
                <input className="input" placeholder="Email" type="email" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})}/>
                <input className="input" placeholder="+91 9876543210" value={form.mobile} onChange={(e)=>setForm({...form,mobile:e.target.value})}/>
                <input className="input" placeholder="Password" type="password" value={form.password} onChange={(e)=>setForm({...form,password:e.target.value})}/>
              </div>
              <div className="mt-4">
                <button className="btn w-full">Create Agent</button>
              </div>
            </form>

            <div className="card p-5">
              <div className="text-lg font-semibold mb-3">All Agents</div>
              <div className="divide-y">
                {agents.map((a) => <AgentRow key={a._id} agent={a} onDelete={del} />)}
                {agents.length === 0 && <div className="text-sm text-gray-500 py-6 text-center">No agents yet.</div>}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
