import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

interface User {
  id: string;
  username: string;
  email: string;
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  fetchUser: () => Promise<boolean>;
  logout: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async (): Promise<boolean> => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/verify`,
        {
          withCredentials: true,
        }
      );

      if (response.data.status === "success") {
        setUser(response.data.data.loggedUser);
      }

      return true;
    } catch (error) {
      setUser(null);
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      setUser(null);
    } catch (error) {
      console.log("Logout failed", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, fetchUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
