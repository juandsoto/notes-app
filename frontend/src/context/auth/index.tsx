import { createContext, useContext } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import { UserSchema } from "../../types";

interface Props {
  children: JSX.Element | JSX.Element[];
}

type Auth = Omit<UserSchema, "password"> & { token: string };

interface IAuthContext {
  user: Auth;
  setUser: React.Dispatch<React.SetStateAction<Auth | null>>;
  logout: () => void;
}

const initialUser: Auth = {
  username: "",
  active: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  email: "",
  token: "",
};

const AuthContext = createContext<IAuthContext>({
  user: initialUser,
} as IAuthContext);

export const AuthProvider = ({ children }: Props): JSX.Element => {
  const [user, setUser] = useLocalStorage<Auth | null>("user", initialUser);

  const logout = () => setUser(initialUser);

  return <AuthContext.Provider value={{ user: user!, setUser, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
