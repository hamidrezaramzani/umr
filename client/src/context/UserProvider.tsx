/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useState } from "react";

interface UserInfo {
  id: string;
  token: string;
  type: string;
}
type User = {
  user: UserInfo | null;
  isLogged: boolean;
};

type UserContextType = {
  user: User | null;
  login: (user: UserInfo) => void;
  logout: () => void;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

type UserProviderProps = {
  children: React.ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  let initialUser = null;
  const storedUser = localStorage.getItem("umr-user");
  if (storedUser) {
    initialUser = {
      isLogged: true,
      user: JSON.parse(storedUser),
    };
  }
  const [user, setUser] = useState<User | null>(initialUser);
  const login = (user: UserInfo) => {
    localStorage.setItem("umr-user", JSON.stringify(user));
    setUser({
      isLogged: true,
      user,
    });
  };

  const logout = () => {
    localStorage.removeItem("umr-user");
    setUser({
      isLogged: false,
      user: null,
    });
  };
  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
