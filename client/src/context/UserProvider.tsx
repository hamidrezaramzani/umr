import { createContext, useState } from "react";

interface UserInfo {
  id: string;
  token: string;
  type: string;
}
type User = {
  user: UserInfo;
  isLogged: boolean;
};

type UserContextType = {
  user: User | null;
  login: (user: UserInfo) => void;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  login: () => {},
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
  return (
    <UserContext.Provider value={{ user, login }}>
      {children}
    </UserContext.Provider>
  );
};
