import { createContext, useEffect, useMemo, useState } from "react";
import {jwtDecode} from "jwt-decode";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);
  const [user, setUser] = useState(() => {
    try {
      const t = localStorage.getItem("token");
      return t ? jwtDecode(t) : null;
    } catch {
      return null;
    }
  });

  const login = (jwt) => {
    localStorage.setItem("token", jwt);
    setToken(jwt);
    setUser(jwtDecode(jwt));
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const value = useMemo(() => ({ token, user, login, logout }), [token, user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
