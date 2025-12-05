"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext({
  user: null,
  setUser: () => {},
});

export function AuthProvider({ initialUser, children }) {
  const [user, setUser] = useState(initialUser);

  
  useEffect(() => {
    setUser(initialUser);
  }, [initialUser]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}