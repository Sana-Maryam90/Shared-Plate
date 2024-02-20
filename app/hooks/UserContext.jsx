"use client";
import React, { createContext, useContext, useState } from "react";

export const UserContext = createContext(null);

export default function UserProvider({ children }) {
  const [user, setUser] = useState({});

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserContext Provider");
  }
  return context
}
