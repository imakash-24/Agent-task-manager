import { useContext, useState } from "react";
import API from "../api";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const { data } = await API.post("/auth/login", form);
      login(data.token);           // backend returns { token }
      window.location.href = "/dashboard";
    } catch (e) {
      setErr(e?.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <div className="hidden md:flex items-center justify-center bg-gray-50">
        <div className="max-w-md p-8">
          <h2 className="text-3xl font-bold">Task Manager</h2>
          <p className="mt-2 text-gray-600">Login as Admin to manage agents and uploads.</p>
        </div>
      </div>
      <div className="flex items-center justify-center p-6">
        <form onSubmit={submit} className="card w-full max-w-sm p-6">
          <h1 className="text-2xl font-semibold mb-4 text-center">Admin Login</h1>
          {err && <div className="mb-3 text-red-600 text-sm">{err}</div>}
          <input
            className="input mb-3"
            placeholder="Email"
            type="email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            className="input mb-4"
            placeholder="Password"
            type="password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button className="btn w-full">Login</button>
        </form>
      </div>
    </div>
  );
}
