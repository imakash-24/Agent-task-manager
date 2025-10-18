import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { useEffect, useState } from "react";
import API from "../api";
import GroupedTasks from "../components/GroupedTasks";

const ACCEPT = [".csv", ".xls", ".xlsx"];

export default function Upload() {
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const [agents, setAgents] = useState([]);
  const [distributed, setDistributed] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // ✅ Load saved tasks from localStorage when component mounts
  useEffect(() => {
    API.get("/agents").then((r) => setAgents(r.data)).catch(() => setAgents([]));

    const saved = localStorage.getItem("distributedTasks");
    if (saved) {
      setDistributed(JSON.parse(saved));
    }
  }, []);

  const onFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const ok = ACCEPT.some((ext) => f.name.toLowerCase().endsWith(ext));
    if (!ok) {
      setMsg("Only CSV, XLS, XLSX are allowed.");
      setFile(null);
      return;
    }
    setMsg("");
    setFile(f);
  };

  const upload = async (e) => {
    e.preventDefault();
    if (!file) return setMsg("Choose a file first.");
    setBusy(true);
    setMsg("");

    const form = new FormData();
    form.append("file", file);

    try {
      const { data } = await API.post("/tasks/upload", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const newTasks = data.distributedTasks || data.tasks || [];
      setDistributed(newTasks);

      // ✅ Persist tasks in localStorage so they survive navigation
      localStorage.setItem("distributedTasks", JSON.stringify(newTasks));

      setMsg("Uploaded & distributed successfully.");
    } catch (e) {
      setMsg(e?.response?.data?.error || e?.response?.data?.message || "Upload failed.");
    } finally {
      setBusy(false);
    }
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
          title="Upload & Distribute"
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
          isSidebarOpen={isSidebarOpen}
        />

        <main className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6 space-y-6">
            <form onSubmit={upload} className="card p-5">
              <div className="flex flex-col md:flex-row md:items-end gap-3">
                <div className="flex-1">
                  <label className="block text-sm text-gray-600 mb-1">
                    Upload file (CSV/XLS/XLSX)
                  </label>
                  <input
                    type="file"
                    accept={ACCEPT.join(",")}
                    onChange={onFile}
                    className="input"
                  />
                </div>
                <button disabled={busy} className="btn md:w-40">
                  {busy ? "Uploading..." : "Upload"}
                </button>
              </div>
              {msg && (
                <div className="text-sm mt-3">
                  {msg.includes("success") ? (
                    <span className="text-green-600">{msg}</span>
                  ) : (
                    <span className="text-red-600">{msg}</span>
                  )}
                </div>
              )}
            </form>

            <div className="card p-5">
              <div className="text-lg font-semibold mb-3">
                Distributed Lists (Grouped by Agent)
              </div>
              <GroupedTasks agents={agents} tasks={distributed} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
