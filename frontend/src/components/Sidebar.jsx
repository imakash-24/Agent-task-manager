import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { X } from "lucide-react"; // close icon

const LinkItem = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `block rounded-lg px-3 py-2 text-sm ${
        isActive
          ? "bg-blue-50 text-blue-600"
          : "text-gray-700 hover:bg-gray-50"
      }`
    }
  >
    {children}
  </NavLink>
);

export default function Sidebar({ onClose }) {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <aside className="flex min-h-screen w-64 flex-col border-r bg-white">
      <div className="px-4 py-4 border-b flex items-center justify-between">
        <div>
          <div className="text-xl font-bold">Admin Panel</div>
          <div className="text-xs text-gray-500">Task Manager</div>
        </div>

        {/* Close button only visible on mobile/tablet */}
        <button
          onClick={onClose}
          className="xl:hidden text-gray-600 hover:text-gray-900"
        >
          <X size={20} />
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        <div className="text-xs uppercase text-gray-400 px-1 mb-1">Menu</div>
        <LinkItem to="/dashboard">Dashboard</LinkItem>
        <LinkItem to="/agents">Agents</LinkItem>
        <LinkItem to="/upload">Upload Lists</LinkItem>
      </nav>

      <div className="p-4 border-t">
        <button
          onClick={() => {
            logout();
            navigate("/");
          }}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-lg"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
