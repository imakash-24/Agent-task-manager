import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Agents from "./pages/Agents";
import Upload from "./pages/Upload";

function Private({ children }) {
  const { token } = useContext(AuthContext);
  if (!token) return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Private><Dashboard /></Private>} />
          <Route path="/agents" element={<Private><Agents /></Private>} />
          <Route path="/upload" element={<Private><Upload /></Private>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
