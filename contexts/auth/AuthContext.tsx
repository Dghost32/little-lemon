import { PropsWithChildren, createContext } from "react";
import useAsyncStorageState from "@/hooks/useAsyncStorageState";
import useLog from "@/hooks/useConsoleLog";

type User = {
  username: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
  login: (user: User, callback?: () => void) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

type AuthProviderProps = PropsWithChildren<{}>;
const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser, loading] = useAsyncStorageState({
    key: "user",
    initialValue: null as User | null,
  });

  useLog(user);

  function login(user: User, callback?: () => void) {
    setUser(user);
    if (callback) callback();
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
